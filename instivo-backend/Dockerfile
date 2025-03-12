FROM node:23-alpine

ENV PATH="$PATH:/usr/app/node_modules/.bin"

COPY package.json ./

ARG APPLICATION_FOLDER=/usr/src/instivo-backend

RUN mkdir -p $APPLICATION_FOLDER

WORKDIR $APPLICATION_FOLDER

COPY . $APPLICATION_FOLDER

RUN npm install

RUN rm -rf dist/*

RUN npm run build

EXPOSE 8080 3333

CMD [ "npm", "run", "dev" ]
