from django.db import models
from django.core.validators import MinLengthValidator, RegexValidator
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.exceptions import ValidationError as DjangoValidationError
from accounts.utils.genders import GENDERS
from accounts.utils.roles import ROLES
from accounts.utils.image_upload import USER_DIRECTORY_PATH
from accounts.services.user_id import GENERATE_USER_ID
from core.utils import VALIDATE_IMAGE_EXTENSION, VALIDATE_IMAGE_SIZE, VALIDATE_EMAIL, VALIDATE_ALPHA, VALIDATE_PHONE_NUMBER, GENERATE_SLUG
from accounts.managers import UserManager
from django.utils.translation import gettext_lazy as _

class User(AbstractBaseUser, PermissionsMixin):
    user_id = models.CharField(
        unique=True,
        db_index=True,
        max_length=9,
        validators=[MinLengthValidator(9)],
        editable=False,
    )
    image = models.ImageField(
        validators=[VALIDATE_IMAGE_EXTENSION, VALIDATE_IMAGE_SIZE],
        upload_to=USER_DIRECTORY_PATH,
        null=True,
        blank=True,
    )
    username = models.CharField(
        unique=True,
        db_index=True,
        max_length=40,
        validators=[
            MinLengthValidator(3),
            RegexValidator(
                regex=r'^[a-zA-Z0-9_]+$',
                message=_('Username can only contain letters, numbers, and underscores.'),
            ),
        ],
    )
    slug = models.SlugField(
        unique=True,
        max_length=50,
        editable=False,
    )
    email = models.EmailField(
        unique=True,
        db_index=True,
        validators=[MinLengthValidator(10), VALIDATE_EMAIL],
    )
    first_name = models.CharField(
        max_length=20,
        db_index=True,
        validators=[MinLengthValidator(3), VALIDATE_ALPHA],
        blank=True,
        null=True,
    )
    last_name = models.CharField(
        max_length=20,
        db_index=True,
        validators=[MinLengthValidator(3), VALIDATE_ALPHA],
        blank=True,
        null=True,
    )
    number = models.CharField(
        max_length=20,
        db_index=True,
        validators=[MinLengthValidator(11), VALIDATE_PHONE_NUMBER],
        blank=True,
        null=True,
    )
    gender = models.CharField(
        max_length=10,
        choices=GENDERS,
        blank=True,
        null=True,
    )
    role = models.CharField(
        max_length=10,
        choices=ROLES,
        default='user',
    )
    
    terms_accepted = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_block = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    class Meta:
        ordering = ['-date_joined']

    def __str__(self):
        return self.username or self.email
    
    def clean(self):
        if self.role == 'admin':
            existing_admin = User.objects.filter(role='admin')
            if self.pk:
                existing_admin = existing_admin.exclude(pk=self.pk)
            if existing_admin.exists():
                raise DjangoValidationError(_('Only one admin is allowed.'))

    def save(self, *args, **kwargs):
        if not self.user_id:
            self.user_id = GENERATE_USER_ID(self.role)
        if self.pk:
            orig = User.objects.only("username").filter(pk=self.pk).first()
            if orig and orig.username != self.username:
                self.slug = GENERATE_SLUG(self.username)
        else:
            self.slug = GENERATE_SLUG(self.username)

        super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        if self.image:
            self.image.delete(save=False)
        super().delete(using=using, keep_parents=keep_parents)
