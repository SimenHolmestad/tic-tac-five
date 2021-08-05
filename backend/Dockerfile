FROM node:16.2-slim
WORKDIR /application
COPY package.json /application
RUN npm install
COPY . /application
CMD ["npm", "start"]
