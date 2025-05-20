from django.db import models
from django.core.validators import MinLengthValidator, RegexValidator
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.translation import gettext_lazy as _
from accounts.managers import UserManager
from accounts.utils import USER_DIRECTORY_PATH, ROLES, GENDERS
from app.utils import validate_email, generate_slug, validate_alpha

class User(AbstractBaseUser, PermissionsMixin):
    image = models.ImageField(
        upload_to=USER_DIRECTORY_PATH,
        null=True,
        blank=True,
    )
    username = models.CharField(
        unique=True,
        max_length=40,
        validators=[
            MinLengthValidator(3),
            RegexValidator(
                regex=r'^[a-zA-Z0-9_]+$',
                message=_('Username can only contain letters, numbers, and underscores.'),
            ),
        ],
        db_index=True,
    )
    slug = models.SlugField(
        unique=True,
        max_length=50,
        editable=False,
    )
    email = models.EmailField(
        unique=True,
        validators=[MinLengthValidator(10), validate_email],
        db_index=True,
    )
    first_name = models.CharField(
        max_length=20,
        validators=[MinLengthValidator(3), validate_alpha],
        blank=True,
        db_index=True,
    )
    last_name = models.CharField(
        max_length=20,
        validators=[MinLengthValidator(3), validate_alpha],
        blank=True,
        db_index=True,
    )
    number = models.CharField(
        max_length=11,
        validators=[MinLengthValidator(11)],
        blank=True,
        db_index=True,
    )
    gender = models.CharField(
        max_length=10,
        choices=GENDERS,
        blank=True,
    )
    role = models.CharField(
        max_length=10,
        choices=ROLES,
        default='user',
    )
    terms_accepted = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_blocked = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    class Meta:
        ordering = ['-date_joined']

    def save(self, *args, **kwargs):
        if self.username:
            base_slug = generate_slug(self.username)
            slug = base_slug
            i = 1
            while User.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{i}"
                i += 1
            self.slug = slug
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
            'access_token': str(refresh.access_token),
        }

    def __str__(self):
        return self.username or self.email
