FROM alpine:latest

WORKDIR /app

EXPOSE 3000

COPY ./package.json .

RUN apk update && apk add yarn && yarn

COPY . .

CMD ["yarn", "start"]
