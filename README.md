

# RUN PRODUCTION

1. Создать файл `.env` по образцу `.env.example`, 
указать `SERVER_PORT`, `CONFIG_FILE_PATH`, `SECRET`

2. Собрать фронтенд `yarn build`

3. Запустить сервер `yarn start`

# RUN DEVELOPMENT FRONTEND
 Чтобы использовать webpack dev server вместе с основным сервером:
 1. Указать в `.env` `PORT` для dev сервера
 2. в `package.json` в параметре `proxy` указать ссылку на основной сервер (где порт==`SERVER_PORT`)
 ```
 "proxy": "http://localhost:4000"
 ```
 3. Запустить основной сервер (`yarn start`) и dev-server `yarn run start-dev`
