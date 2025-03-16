# Etapa de construcción
FROM oven/bun:latest AS builder
WORKDIR /app

# Copiar todo para simplificar
COPY . .

# Instalar y construir
RUN bun install
RUN bun run build

# Etapa de producción
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuración para SPAs
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]