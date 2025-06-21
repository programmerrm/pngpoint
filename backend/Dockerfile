# Use lightweight base image
FROM python:3.13-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy your project files into the container
COPY . .

RUN python manage.py migrate --noinput

# Collect static files (for Django)
RUN python manage.py collectstatic --noinput

# Expose the port the app runs on
EXPOSE 8000

# Start Gunicorn server
CMD ["gunicorn", "app.wsgi:application", "--bind", "0.0.0.0:8000"]
