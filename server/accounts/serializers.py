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
        fields = ['id', 'image', 'username', 'email', 'role']

class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, validators=[validate_password])
    terms_accepted = serializers.BooleanField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password', 'terms_accepted']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate_username(self, value):
        return validate_username(value)

    def validate_email(self, value):
        return validate_email(value)
        
    def validate_terms_accepted(self, value):
        return validate_terms_accepted(value)

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({
                "confirm_password": _("Password does not match.")
            })
        return attrs
        
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        user = User(**validated_data)
        try:
            user.set_password(password)
            user.save()
        except DjangoValidationError as e:
            raise serializers.ValidationError(
                e.message_dict if hasattr(e, 'message_dict') else {"detail": list(e.messages)}
            )
        return user
        