FROM python:3.13-slim-bookworm

ENV PYTHONUNBUFFERED=1
ENV UV_PROJECT_ENVIRONMENT=/.venv

# Install only necessary packages and clean up to reduce image size
RUN apt-get update && \
    apt-get install -y --no-install-recommends libreoffice-common libreoffice-writer && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Upgrade pip
RUN python -m pip install --upgrade pip

# Setting workdir
WORKDIR /app

# Copy the requirements 
COPY ./requirements.txt .


# Install dependencies using Pipenv
RUN pip install -r requirements.txt

# Copy Code
COPY . .

# Create a non-root user for security
RUN adduser --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

# PORT
EXPOSE 8000
