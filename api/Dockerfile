FROM node:alpine
MAINTAINER Antti Qvickström <anqqa@klubitus.org>

RUN apk add --update bash \
    && rm -rf /var/cache/apk/* \
    && mkdir -p /opt/api

WORKDIR /opt/api

COPY package.json /opt/api/
RUN npm install --production

COPY . /opt/api

EXPOSE 3000

CMD [ "npm", "start" ]
