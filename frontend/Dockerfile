FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install && npm install -g nodemon

COPY . .

EXPOSE 3000
CMD nodemon --watch .env --exec 'npm run dev'
