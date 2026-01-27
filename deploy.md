# Deploy

Aqui documentare varios aspectos de como se hace el deploy actualmente para poder despues crear una pipeline de CI/CD

---
## Infra usada
- VPS de hostinger
- Dominio de IONOS
## ¿Cómo subes código al VPS actualmente?

Se sube el codigo fuente a github para posteriormente hacer un pull en el vps

## ¿Qué comandos ejecutas para actualizar los contenedores?
Estos son los pasos para actualizar el proyecto, tomando en cuenta que la rama main esta actualizada

- Me meto via ssh
- Navego a la carpeta del proyecto
- *git fetch*
- *git pull*
- *alias comp="deploy/docker-compose.prod.yml"*
- *comp down*
- *comp build*
- *comp up -d*

## ¿Tienes un proceso de rollback si algo sale mal?

No realmente, simplemente regresaria a una rama anterior y haria el proceso de deploy, sin embargo si la base de datos se rompe no hay nada realmente que pueda hacer