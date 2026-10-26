FROM nginx:1.30-alpine

# Elimina config default
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
