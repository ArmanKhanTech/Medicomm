FROM node:19.2.0
WORKDIR /app
ADD . /app
RUN npm install
EXPOSE 3000
CMD [ "npm", "start"]