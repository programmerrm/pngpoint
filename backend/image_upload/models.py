from django.db import models
from django.core.validators import MinLengthValidator
from app.utils import validate_image_extension, validate_image_dimensions, generate_slug
from django.utils.translation import gettext_lazy as _

STATUS = [
    ('pending', 'Pending'),
    ('approved', 'Approved'),
]

class Categories(models.Model):
    name = models.CharField(
        unique=True,
        max_length=80,
        validators=[MinLengthValidator(3)],
        db_index=True,
        verbose_name=_('Category'),
        help_text=_('Enter your category name...'),
    )
    slug = models.SlugField(
        unique=True,
        max_length=100,
        editable=False,
        null=True,
        blank=True,
    )

    def save(self, *args, **kwargs):
        if self.name:
            self.slug = generate_slug(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class ImageUpload(models.Model):
    image = models.ImageField(
        upload_to='images/',
        validators=[validate_image_extension, validate_image_dimensions],
        verbose_name=_('Image'),
        help_text=_('Upload your image file...')
    )
    status = models.CharField(
        max_length=20,
        default='pending',
        choices=STATUS,
        verbose_name=_('Status'),
        help_text=_('Enter the status of the image.'),
    )
    uploaded_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_('Uploaded'),
    )

    def __str__(self):
        return f"Image - {self.status}"

