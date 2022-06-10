FROM node:18-alpine

RUN mkdir -p /opt/microservices-app/redis-to-mongo && chown node:node /opt/microservices-app/redis-to-mongo
WORKDIR /opt/microservices-app/redis-to-mongo

USER node
COPY --chown=node:node package*.json ./
RUN npm install && npm cache clean --force

COPY --chown=node:node . .

CMD [ "npm", "start" ]