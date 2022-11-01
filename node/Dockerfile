FROM node:alpine
MAINTAINER daniel@lightfeather.io
EXPOSE 8080
WORKDIR /home/node
COPY . .
RUN npm install
ENTRYPOINT ["node", "index.js"]
