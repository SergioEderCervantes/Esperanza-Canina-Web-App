FROM python:3.13-slim-bookworm

# ------------------------
# ENVIRONMENT
# ------------------------
ENV PYTHONUNBUFFERED=1
ENV UV_PROJECT_ENVIRONMENT=/.venv

# ------------------------
# SYSTEM DEPENDENCIES
# ------------------------
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libreoffice-common \
        libreoffice-writer && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# ------------------------
# PYTHON DEPENDENCIES
# ------------------------
# 👇 Recomendación: asegura setuptools y wheel (necesarios para django-q2)
RUN pip install --upgrade pip setuptools wheel

WORKDIR /app

COPY ./requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# ------------------------
# COPY PROJECT
# ------------------------
COPY . .

# ------------------------
# SECURITY: non-root user
# ------------------------
RUN adduser --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

# ------------------------
# EXPOSE PORT
# ------------------------
EXPOSE 8000
