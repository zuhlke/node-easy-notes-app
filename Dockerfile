FROM node:8.9.4
EXPOSE 8082

WORKDIR /opt/easy-notes-app

COPY server.js package.json ./
COPY config ./config/
COPY app ./app/

RUN npm install

CMD node server.js