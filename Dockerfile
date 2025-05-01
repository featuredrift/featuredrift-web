FROM nginx:1.28.0-alpine
LABEL org.opencontainers.image.source=https://github.com/thezanke/featuredrift-web
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
