from django.db import models
from django.core.validators import MinLengthValidator
from image_upload.utils import STATUS
from app.utils import validate_image_extension, validate_image_dimensions, generate_slug, validate_alpha
from django.utils.translation import gettext_lazy as _

class Category(models.Model):
    name = models.CharField(
        unique=True,
        max_length=60,
        validators=[MinLengthValidator(3), validate_alpha],
        db_index=True,
    )
    slug = models.SlugField(
        unique=True,
        max_length=80,
        editable=False,
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
    )
    status = models.CharField(
        max_length=20,
        default='pending',
        choices=STATUS,
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)
    categories = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='category',
    )

    def __str__(self):
        return f"Image - {self.status}"
