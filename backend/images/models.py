from django.db import models
from django.conf import settings
from django.core.validators import MinLengthValidator
from images.utils.status import STATUS_CHOICES
from core.utils import GENERATE_SLUG

class Images(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE
    )
    image_id = models.CharField(
        max_length=500, 
        unique=True,
        db_index=True,
    )
    url = models.URLField()
    title = models.CharField(
        unique=True,
        max_length=300, 
        blank=True,
        null=True,
        db_index=True,
    )
    slug = models.SlugField(
        unique=True,
        max_length=350,
        editable=False,
    )
    description = models.TextField(
        max_length=1000,
        blank=True,
        null=True,
    )
    category = models.CharField(
        max_length=50,
        null=True,
        blank=True,
    )
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='pending'
    )
    download_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title or self.image_id} ({self.status})"
    
    def save(self, *args, **kwargs):
        if self.pk:
            orig = Images.objects.only("title").filter(pk=self.pk).first()
            if orig and orig.title != self.title:
                self.slug = GENERATE_SLUG(self.title)
        else:
            self.slug = GENERATE_SLUG(self.title)

        super().save(*args, **kwargs)

class ImageKeywords(models.Model):
    image = models.ForeignKey(
        Images,
        on_delete=models.CASCADE,
        related_name='keywords'
    )
    name = models.CharField(
        max_length=40,
        validators=[MinLengthValidator(3)],
        db_index=True,
    )

    def __str__(self):
        return self.name
