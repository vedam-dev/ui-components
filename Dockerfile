FROM node:20-alpine

WORKDIR /app

ADD . /app

RUN yarn install

EXPOSE 6006

CMD ["yarn", "storybook"]
