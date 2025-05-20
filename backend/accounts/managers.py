from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import ValidationError

class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValidationError(_('Email is must required.'))
        if not username:
            raise ValidationError(_('Username is must required.'))
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            username=username,
            **extra_fields,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password, **extra_fields):
        extra_fields.setdefault('role', 'admin')
        extra_fields.setdefault('terms_accepted', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        user=self.create_user(
            email,
            username,
            password,
            **extra_fields,
        )
        return user
