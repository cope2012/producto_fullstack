FROM node:15

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY webapp/package*.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
