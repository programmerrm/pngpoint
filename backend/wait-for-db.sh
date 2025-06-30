#!/bin/sh

echo "⏳ Waiting for PostgreSQL to be ready..."

while ! nc -z $SQL_HOST $SQL_PORT; do
  sleep 1
done

echo "✅ PostgreSQL is up – continuing..."

exec "$@"
