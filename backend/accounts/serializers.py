from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from accounts.validators import validate_username, validate_email, validate_terms_accepted
from django.utils.translation import gettext_lazy as _

User = get_user_model()

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'image', 'username', 'email']

class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, validators=[validate_password])
    terms_accepted = serializers.BooleanField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password', 'terms_accepted']

    def validate_username(self, value):
        return validate_username(value)

    def validate_email(self, value):
        return validate_email(value)

    def validate_terms_accepted(self, value):
        return validate_terms_accepted(value)

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('confirm_password'):
            raise serializers.ValidationError({
                "confirm_password": _("Passwords do not match.")
            })
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        try:
            user = User(**validated_data)
            user.set_password(password)
            user.save()
            return user
        except DjangoValidationError as e:
            raise serializers.ValidationError(
                e.message_dict if hasattr(e, 'message_dict') else {"detail": list(e.messages)}
            )
