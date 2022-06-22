FROM node:18-alpine

EXPOSE 3001

RUN mkdir -p /opt/microservices-app/frontend && chown node:node /opt/microservices-app/frontend
WORKDIR /opt/microservices-app/frontend

USER node
COPY --chown=node:node package*.json ./
RUN npm install && npm cache clean --force

COPY --chown=node:node . .

CMD [ "npm", "start" ]