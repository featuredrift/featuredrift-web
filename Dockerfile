FROM node:23.11-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.28.0-alpine
LABEL org.opencontainers.image.source=https://github.com/featuredrift/featuredrift-web
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
