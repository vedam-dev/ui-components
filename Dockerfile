FROM docker-registry.pblbde.com/ds-node-lts:20

WORKDIR /app

ADD . /app

RUN yarn install

EXPOSE 6006

CMD ["yarn", "storybook"]
