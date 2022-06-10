FROM node:18-alpine

RUN mkdir -p /opt/microservices-app/api && chown node:node /opt/microservices-app/api
WORKDIR /opt/microservices-app/api

USER node
COPY --chown=node:node package*.json ./
RUN npm install && npm cache clean --force

COPY --chown=node:node . .

CMD [ "npm", "start" ]