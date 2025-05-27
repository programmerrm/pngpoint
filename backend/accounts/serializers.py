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

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True)
    confirm_new_password = serializers.CharField(write_only=True, required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is incorrect")
        return value

    def validate(self, data):
        if data['new_password'] != data['confirm_new_password']:
            raise serializers.ValidationError({"new_password": "New passwords do not match"})
        return data

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user

class AdminProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['image', 'username', 'email', 'first_name', 'last_name', 'number', 'gender', 'role']
        read_only_fields = ('id', 'is_superuser', 'is_staff', 'last_login')

class AdminProfileUpdatedSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)
    username = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    number = serializers.CharField(required=False)
    gender = serializers.CharField(required=False)
    
    class Meta:
        model = User
        fields = ['image', 'username', 'email', 'first_name', 'last_name', 'number', 'gender']

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance