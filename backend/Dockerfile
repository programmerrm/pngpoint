# backend/Dockerfile
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY ./requirements.txt .

RUN apt-get update && apt-get install -y \
    gcc python3-dev libpq-dev \
    && pip install --upgrade pip \
    && pip install -r requirements.txt \
    && apt-get remove -y gcc

COPY ./backend .

CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
