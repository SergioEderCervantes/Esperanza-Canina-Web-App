FROM python:3.13-slim-bookworm AS backend_build

# Enviroment
ENV PYTHONUNBUFFERED=1


WORKDIR /app

# Herramientas parra compilar wheel, no se si hace falta la vdd
RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential gcc && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# pip preparado
RUN pip install --upgrade pip setuptools wheel


# copiar sólo requirements y construir wheels (wheelhouse)
COPY ./requirements.txt /app/requirements.txt
RUN mkdir /wheels
RUN pip wheel --wheel-dir=/wheels -r /app/requirements.txt

# copiar el proyecto y luego instalar desde wheelhouse para poder ejecutar collectstatic
COPY . /app
RUN pip install --no-index --find-links=/wheels -r /app/requirements.txt

# Ejecutar el collecstatic
RUN python manage.py collectstatic --noinput


FROM python:3.13-slim-bookworm AS backend_runtime

# ------------------------
# ENVIRONMENT
# ------------------------
ENV PYTHONUNBUFFERED=1
ENV UV_PROJECT_ENVIRONMENT=/.venv

WORKDIR /app
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
COPY --from=backend_build /wheels /wheels
COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-index --find-links=/wheels -r /app/requirements.txt

# ------------------------
# COPY PROJECT
# ------------------------
COPY --from=backend_build /app /app


# ------------------------
# SECURITY: non-root user
# ------------------------
RUN adduser --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser
