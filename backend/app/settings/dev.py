#########################################################
"""
Development settings configuration
"""
#########################################################
from app.settings.base import *
from datetime import timedelta

DEBUG =True
ALLOWED_HOSTS = ['*']
SECRET_KEY = 'django-insecure-j_e%v-u_3q+%vgb$zctpqf4)0k1!2sfy5*nkj7_-6s0e+l-h)q'

INSTALLED_APPS += [
    'schema_viewer',
    'drf_spectacular',
    'drf_spectacular_sidecar',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:8000',
]

REST_FRAMEWORK['DEFAULT_SCHEMA_CLASS'] = 'drf_spectacular.openapi.AutoSchema'

SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'] = timedelta(days=7)
SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'] = timedelta(days=30)

SPECTACULAR_SETTINGS = {
    'TITLE': 'PNG Point Project API',
    'DESCRIPTION': 'This is the API documentation for the development version of the PNG Point project. '
                   'It provides endpoints for authentication, user management, and business logic that power '
                   'the dashboard and client-facing features during the development phase.',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'SWAGGER_UI_DIST': 'SIDECAR',
    'SWAGGER_UI_FAVICON_HREF': 'SIDECAR',
    'REDOC_DIST': 'SIDECAR',
}
