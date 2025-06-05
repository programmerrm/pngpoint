from django.db import models
from django.conf import settings
from django.core.validators import MinLengthValidator
from image_upload.utils import STATUS_CHOICES

class CloudflareImageModel(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE
    )
    image_id = models.CharField(
        max_length=255, 
        unique=True
    )
    url = models.URLField()
    title = models.CharField(
        max_length=255, 
        blank=True
    )
    description = models.TextField(
        blank=True
    )
    category = models.CharField(
        max_length=100,
        null=True,
        blank=True,
    )
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='pending'
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.title or self.image_id} ({self.status})"

class CloudflareImageKeyword(models.Model):
    cloudflareImageModel = models.ForeignKey(
        CloudflareImageModel,
        on_delete=models.CASCADE,
        related_name='cloudflareImageKeywords'
    )
    name = models.CharField(
        max_length=80,
        validators=[MinLengthValidator(1)],
        null=True,
        blank=True,
        db_index=True,
    )

    def __str__(self):
        return self.name
    