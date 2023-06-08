# Первый этап: сборка фронтенд-приложения
FROM node:14-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build

# Второй этап: запуск фронтенд-приложения с Nginx
FROM nginx:alpine

# Копирование собранного фронтенд-приложения
COPY --from=builder /app/build /usr/share/nginx/html

# Копирование конфигурационного файла Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Внешний порт Nginx
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
