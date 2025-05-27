# from django.db import models
# from django.core.validators import MinLengthValidator
# from django.utils.translation import gettext_lazy as _
# from image_upload.utils import STATUS
# from app.utils import validate_image_extension, validate_image_dimensions

# class ImageMetaData(models.Model):
#     filename = models.CharField(
#         max_length=50,
#         validators=[MinLengthValidator(3)],
#         blank=True,
#         null=True
#     )
#     width = models.PositiveIntegerField(
#         blank=True, 
#         null=True
#     )
#     height = models.PositiveIntegerField(
#         blank=True, 
#         null=True
#     )
#     size = models.PositiveIntegerField(
#         blank=True, 
#         null=True
#     )
#     format = models.CharField(
#         max_length=20,
#         validators=[MinLengthValidator(3)],
#         blank=True,
#         null=True
#     )
#     title = models.CharField(
#         max_length=50,
#         validators=[MinLengthValidator(3)],
#         blank=True,
#         null=True
#     )
#     created_at = models.DateTimeField(
#         auto_now_add=True
#     )

#     def __str__(self):
#         return self.filename or f"Metadata-{self.id}"

# class ImageUpload(models.Model):
#     image = models.ImageField(
#         upload_to='images/',
#         validators=[validate_image_extension, validate_image_dimensions],
#     )
#     status = models.CharField(
#         max_length=20,
#         default='pending',
#         choices=STATUS,
#     )
#     uploaded_at = models.DateTimeField(
#         auto_now_add=True
#     )
#     imageMetaData = models.ForeignKey(
#         ImageMetaData,
#         on_delete=models.CASCADE,
#         related_name='uploads',
#     )

#     def __str__(self):
#         return f"Image ({self.status}) - {self.image.name}"

# class ImageMetaDataTag(models.Model):
#     imageMetaData = models.ForeignKey(
#         ImageMetaData,
#         on_delete=models.CASCADE,
#         related_name='tags'
#     )
#     tag = models.CharField(
#         max_length=20,
#         validators=[MinLengthValidator(3)],
#         null=True,
#         blank=True
#     )

#     def __str__(self):
#         return self.tag or f"Tag-{self.id}"

# class ImageMetaDataCategory(models.Model):
#     imageMetaData = models.ForeignKey(
#         ImageMetaData,
#         on_delete=models.CASCADE,
#         related_name='categories'
#     )
#     category = models.CharField(
#         max_length=20,
#         validators=[MinLengthValidator(3)],
#         null=True,
#         blank=True
#     )

#     def __str__(self):
#         return self.category or f"Category-{self.id}"

# class ImageMetaDataKeyword(models.Model):
#     imageMetaData = models.ForeignKey(
#         ImageMetaData,
#         on_delete=models.CASCADE,
#         related_name='keywords'
#     )
#     keyword = models.CharField(
#         max_length=20,
#         validators=[MinLengthValidator(3)],
#         null=True,
#         blank=True
#     )

#     def __str__(self):
#         return self.keyword or f"Keyword-{self.id}"


from django.db import models

class UploadedImage(models.Model):
    image = models.ImageField(upload_to='images/')
    title = models.CharField(max_length=255, blank=True, null=True)
    tags = models.TextField(blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

