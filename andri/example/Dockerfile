FROM node:6-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
EXPOSE 3000


COPY . /usr/src/app

RUN npm install
RUN npm run build

CMD [ "npm", "start" ]