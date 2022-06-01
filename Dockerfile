FROM node:16.13.1-alpine

WORKDIR /app

COPY package.json .

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 4000

CMD ["yarn", "start"]