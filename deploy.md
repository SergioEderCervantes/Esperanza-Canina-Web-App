# Deploy

El deploy de produccion lo maneja **Dokploy** en un servidor remoto, con
`deploy/docker-compose.yml`. Postgres, Redis, la API, el worker de
django-q y el frontend viven en el mismo compose; dominios, HTTPS y red se
configuran en la UI de Dokploy (ya no hay nginx ni certbot).

---
## Dominios (pestaña Domains)

El navegador llama a la API en `/api/...` y Django no tiene ese prefijo, asi
que ese dominio necesita *Strip Path*:

| Host | Path | Servicio | Puerto | Strip Path |
|---|---|---|---|---|
| `esperanza-canina.com` y `www.` | `/` | `frontend` | 3000 | — |
| `esperanza-canina.com` y `www.` | `/api` | `api` | 8000 | si |
| `admin.esperanza-canina.com` | `/` | `api` | 8000 | — |

El SSR de Next llama al backend por la red interna en `http://api:8000`.

## Configuracion en Dokploy (una sola vez)

1. Crear un servicio **Compose** en el servidor remoto, apuntando a este repo y
   rama `main`, con *Compose Path* `./deploy/docker-compose.yml`.
2. En *Environment* pegar las variables de `deploy/.env.example` con los
   valores reales (Dokploy las guarda en `deploy/.env`, que esta en `.gitignore`).
3. Configurar los dominios de la tabla de arriba.
4. Opcional: activar *Autodeploy* para desplegar en cada push a `main`.

## Primer deploy y migracion de datos desde el VPS anterior

1. Bajar el TTL de los registros DNS un dia antes.
2. Deploy en Dokploy. La API corre `migrate` sobre la base vacia; es normal.
3. En el VPS anterior, detener la app para congelar escrituras y sacar el respaldo:
   ```bash
   docker exec db pg_dump -U postgres -d patitas -Fc > patitas_$(date +%F).dump
   pg_restore -l patitas_*.dump | grep -c "TABLE DATA"   # debe ser > 0
   ```
4. Copiar el `.dump` al servidor nuevo y restaurarlo sobre una base recreada
   (`<app>` es el *App Name* del compose en Dokploy):
   ```bash
   P=<app>
   docker stop $P-api-1 $P-django_q-1
   docker exec $P-db-1 psql -U postgres -c "DROP DATABASE patitas WITH (FORCE)"
   docker exec $P-db-1 psql -U postgres -c "CREATE DATABASE patitas"
   docker exec -i $P-db-1 pg_restore -U postgres -d patitas --no-owner --no-acl --exit-on-error < patitas_*.dump
   docker start $P-api-1 $P-django_q-1
   ```
5. Apuntar los registros A de `esperanza-canina.com`, `www` y `admin` a la IP
   del servidor nuevo. Traefik emite los certificados en cuanto el DNS resuelve.

Para probar antes de mover el DNS se pueden usar dominios temporales,
agregandolos tambien a `DJANGO_ALLOWED_HOSTS` y `DJANGO_CSRF_TRUSTED_ORIGINS`.

## Actualizar

Push a `main` (con Autodeploy) o *Deploy* en Dokploy. Las migraciones corren
solas al arrancar la API.

## Rollback

Desde *Deployments* en Dokploy se puede volver a desplegar un commit anterior.
Si una migracion rompio la base, restaurar el ultimo respaldo con el paso 4.

## Respaldos

Los datos viven en el volumen `pg_data`. Respaldo manual:

```bash
docker exec <app>-db-1 pg_dump -U postgres -d patitas -Fc > patitas_$(date +%F).dump
```
