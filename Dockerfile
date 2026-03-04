# Вместо node:22.14.0, укажите актуальную версию node lts. https://nodejs.org/en/about/previous-releases#looking-for-the-latest-release-of-a-version-branch
FROM node:25.8.0

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы package.json и package-lock.json внутрь контейнера
COPY package.json package-lock.json ./

# Устанавливаем зависимости проекта
RUN npm ci

# Копируем все остальные файлы проекта внутрь контейнера
COPY . .

# Будет запускаться при старте контейнера
CMD ["npm", "start"]