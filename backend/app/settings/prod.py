#########################################################
"""
Production settings configuration
"""
#########################################################
from app.settings.base import *
from datetime import timedelta

DEBUG = False
ALLOWED_HOSTS = ['pngpoint.com']
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', None)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('POSTGRES_DB', 'mydb'),
        'USER': os.getenv('POSTGRES_USER', 'myuser'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD', 'mypassword'),
        'HOST': os.getenv('POSTGRES_HOST', 'localhost'),
        'PORT': os.getenv('POSTGRES_PORT', '5432'),
    }
}

CSRF_TRUSTED_ORIGINS = ['https://pngpoint.com']

SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'] = timedelta(minutes=5)
SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'] = timedelta(days=1)
