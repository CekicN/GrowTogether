FROM node:20-alpine3.17 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build
EXPOSE 4200
CMD ["ng", "serve"]
