FROM node:14

WORKDIR /app

COPY package*.json /app/

RUN npm i

COPY . .

RUN npm run build
EXPOSE 7777

CMD "npm" "start"