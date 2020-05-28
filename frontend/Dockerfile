FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install react-scripts@1.1.1 -g --silent
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 6000
CMD [ "serve", "-s", "build", "-l", "6000" ]
