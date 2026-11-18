FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY app ./app

ENV APP_ENV=development
ENV PORT=3000

EXPOSE 3000

CMD ["node", "app/server.js"]
