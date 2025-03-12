FROM node:23-alpine

COPY ../package.json  ../package-lock.json ./

ARG APPLICATION_FOLDER=/usr/src/instivo-frontend

RUN mkdir -p $APPLICATION_FOLDER

WORKDIR $APPLICATION_FOLDER

COPY . $APPLICATION_FOLDER

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
