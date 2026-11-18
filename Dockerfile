
FROM node:22-alpine

WORKDIR /app

# npm is not required to run this application
RUN rm -rf /usr/local/lib/node_modules/npm \
    /usr/local/bin/npm \
    /usr/local/bin/npx

COPY package.json ./
COPY app ./app

ENV APP_ENV=development
ENV PORT=3000

EXPOSE 3000

CMD ["node", "app/server.js"]
