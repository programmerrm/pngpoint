import os
import phonenumbers
from PIL import Image
from django.utils.text import slugify
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator
from django.utils.translation import gettext_lazy as _

def VALIDATE_IMAGE_EXTENSION(image):
    ext = os.path.splitext(image.name)[1].lower()
    valid_extensions = ['.jpg', '.jpeg', '.png', '.webp']
    if ext not in valid_extensions:
        raise ValidationError(
            _(f'Unsupported file extension "{ext}". Allowed types: JPG, JPEG, PNG, WEBP.')
        )
    
def VALIDATE_IMAGE_SIZE(image):
    max_size = 10 * 1024 * 1024
    if image.size > max_size:
        raise ValidationError(_('The image file size must be less than 10 MB.'))

def VALIDATE_IMAGE_DIMENSIONS(image):
    min_width, min_height = 2000, 2000
    max_width, max_height = 10000, 10000

    try:
        with Image.open(image) as img:
            width, height = img.size
    except Exception:
        raise ValidationError('Invalid image file.')

    if width < min_width or height < min_height:
        raise ValidationError(
            _(f'Image is too small: {width}x{height}px. Minimum size is {min_width}x{min_height}px.')
        )
    if width > max_width or height > max_height:
        raise ValidationError(
            _(f'Image is too large: {width}x{height}px. Maximum size is {max_width}x{max_height}px.')
        )

def VALIDATE_IMAGE_EXTENSION(image):
    ext = os.path.splitext(image.name)[1]
    valid_extensions = ['.png']
    if ext.lower() not in valid_extensions:
        raise ValidationError(
            _(f'Unsupported file extension: {ext}. Only PNG files are allowed.')
        )

def VALIDATE_EMAIL(value):
    try:
        EmailValidator()(value)
    except ValidationError:
        raise ValidationError(_('Invalid email address. Please provide a correct email.'))
    
def VALIDATE_PHONE_NUMBER(value):
    try:
        parsed = phonenumbers.parse(value, None)
        if not phonenumbers.is_valid_number(parsed):
            raise ValidationError(_("Invalid phone number. Please enter a valid  phone number."))
    except phonenumbers.NumberParseException:
        raise ValidationError(_("Invalid phone number format. Please enter a valid number with correct country code if applicable."))
    
def VALIDATE_ALPHA(value):
    if not value.isalpha():
        raise ValidationError(_('This field should only contain letters (a-z).'))

def GENERATE_SLUG(value):
    try:
        return slugify(value)
    except Exception as e:
        raise ValueError(f"Slug generation failed: {e}")
