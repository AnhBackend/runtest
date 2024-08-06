# PRODUCTION
FROM node:18-alpine As production
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
USER node
RUN npm run build
ENV NODE_ENV production
CMD [ "node", "dist/main.js" ]