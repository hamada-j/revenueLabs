FROM node:14
#FROM node:16.4-alpine3.14 as builder

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/

EXPOSE 4200

CMD ["npm", "start"]
