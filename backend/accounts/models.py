from django.db import models
from django.core.validators import MinLengthValidator, RegexValidator
from django.contrib.auth.models import AbstractBaseUser
from app.utils import validate_email, generate_slug, validate_alpha
from accounts.utils import USER_DIRECTORY_PATH
from accounts.managers import UserManager
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.translation import gettext_lazy as _

# Create your models here.

ROLES = [
    ('user', 'User'),
    ('admin', 'Admin'),
]

class User(AbstractBaseUser):
    image = models.ImageField(
        upload_to=USER_DIRECTORY_PATH,
        null=True,
        blank=True,
        verbose_name=_('Image'),
        help_text=_('Upload your photo...'),
    )
    username = models.CharField(
        unique=True,
        validators=[
            MinLengthValidator(3),
            RegexValidator(
                regex=r'^[a-zA-Z0-9_]+$',
                message='Username can only contain letters, numbers, and underscores.',
            ),
        ],
        max_length=40,
        db_index=True,
        verbose_name=_('Username'),
        help_text=_('Enter your username...'),
    )
    slug = models.SlugField(
        unique=True,
        max_length=50,
        editable=False,
        null=True,
        blank=True,
    )
    email = models.EmailField(
        unique=True,
        validators=[MinLengthValidator(10), validate_email],
        db_index=True,
        verbose_name=_('Email Address'),
        help_text=_('Enter your email address...'),
    )
    first_name = models.CharField(
        max_length=30,
        validators=[MinLengthValidator(3), validate_alpha],
        blank=True,
        null=True,
        verbose_name=_('First Name'),
        help_text=_('Enter your first name...'),
    )
    last_name = models.CharField(
        max_length=30,
        validators=[MinLengthValidator(3), validate_alpha],
        blank=True,
        null=True,
        verbose_name=_('Last Name'),
        help_text=_('Enter your last name...'),
    )
    role = models.CharField(
        max_length=10,
        default='user',
        choices=ROLES,
        verbose_name=_('Role'),
        help_text=_('Enter your role...'),
    )
    terms_accepted = models.BooleanField(
        default=False
    )
    is_staff = models.BooleanField(
        default=False,
        verbose_name=_('Is Staff'),
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name=_('Is Active'),
    )
    is_block = models.BooleanField(
        default=False,
        verbose_name=_('Is Block'),
    )
    is_superuser = models.BooleanField(
        default=False,
        verbose_name=_('Is Admin'),
    )
    date_joined = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_('Joined Date'),
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username',]

    objects = UserManager()

    class Meta:
        ordering = ['-date_joined']

    def save(self, *args, **kwargs):
        if self.username:
            self.slug = generate_slug(self.username)
        super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        if self.image:
            self.image.delete(save=False)
        super().delete(using=using, keep_parents=keep_parents)

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh_token': str(refresh),
            'access_token': str(refresh.access_token)
        }

    def __str__(self):
        return self.username or self.email
