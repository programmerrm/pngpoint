from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()

def validate_username(value):
    if User.objects.filter(username__iexact=value).exists():
        raise serializers.ValidationError(_('This username has already been used.'))
    return value

def validate_email(value):
    if User.objects.filter(email__iexact=value).exists():
        raise serializers.ValidationError(_('This email has already been used.'))
    return value

def validate_terms_accepted(value):
    if not value:
        raise serializers.ValidationError("You must agree to the Terms & Conditions.")
    return value
