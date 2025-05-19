import os
from PIL import Image
from io import BytesIO
from rembg import remove
from django.utils.text import slugify
from django.core.files.base import ContentFile
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.utils.translation import gettext_lazy as _

def validate_email(value):
    try:
        EmailValidator(value)
    except ValidationError:
        raise ValidationError(_('Invalid email address. Please provide a correct email.'))

def validate_image_dimensions(image):
    img = Image.open(image)
    width, height = img.size

    min_width, min_height = 2000, 2000
    max_width, max_height = 10000, 10000

    if width < min_width or height < min_height:
        raise ValidationError(
            f'Image is too small: {width}x{height}px. Minimum size is {min_width}x{min_height}px.'
        )
    if width > max_width or height > max_height:
        raise ValidationError(
            f'Image is too large: {width}x{height}px. Maximum size is {max_width}x{max_height}px.'
        )

def validate_image_extension(image):
    ext = os.path.splitext(image.name)[1]
    valid_extensions = ['.png']
    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file extension. Allowed: PNG')

def convert_image_to_webp(image_field):
    image = Image.open(image_field)
    output_io_stream = BytesIO()
    image.save(
        output_io_stream,
        format='WebP',
        quality=95,
    )
    output_io_stream.seek(0)
    converted_image = InMemoryUploadedFile(
        output_io_stream,
        'ImageField',
        f"{os.path.splitext(image_field.name)[0]}.webp",
        'image/webp',
        image.size, None
    )
    return converted_image

def validate_alpha(value):
    if not value.isalpha():
        raise ValidationError('This field should only contain letters (a-z).')

def generate_slug(value):
    try:
        return slugify(value)
    except Exception as e:
        raise ValueError(f"Slug generation failed: {e}")

def remove_bg_and_convert(image_field, target_format='PNG'):
    target_format = target_format.upper()
    valid_formats = ['PNG']
    if target_format not in valid_formats:
        raise ValueError(f"Unsupported target format. Allowed: {', '.join(valid_formats)}")

    input_bytes = image_field.read()
    output_bytes = remove(input_bytes)

    image = Image.open(BytesIO(output_bytes))

    if target_format != 'PNG' and image.mode in ('RGBA', 'P'):
        image = image.convert('RGB')

    output = BytesIO()
    image.save(output, format=target_format, quality=95, optimize=True)
    output.seek(0)

    base_filename = os.path.splitext(image_field.name)[0]
    new_filename = f'{base_filename}_nobg.{target_format.lower()}'

    return ContentFile(output.read(), name=new_filename)
