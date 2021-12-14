# Create image based on the official Node 6 image from the dockerhub
FROM node:14

ENV NODE_ENV production

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Timezone
ENV TZ=Europe/Madrid

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json",  "./"]

RUN npm install --production 

COPY . /usr/src/app    

EXPOSE 3000

CMD ["npm", "start"]

