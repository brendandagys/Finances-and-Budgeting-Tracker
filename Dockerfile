FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

COPY /backend .

EXPOSE 5000

CMD ["node", "server.js"]