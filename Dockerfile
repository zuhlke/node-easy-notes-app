FROM node:8.9.4
EXPOSE 8080
COPY server.js package.json config app .
RUN npm install

CMD node server.js