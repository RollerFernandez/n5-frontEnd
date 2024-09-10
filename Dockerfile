FROM node:20 AS build

WORKDIR /app

# Copia los archivos de la aplicación
COPY ./ /app
# Instala las dependencias y compila la aplicación
RUN yarn install
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80