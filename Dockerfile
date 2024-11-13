FROM node:20.18.0-alpine3.20

RUN apk add --no-cache tini

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --ignore-scripts --only=production && \
    npm cache clean --force && \
    chown -R appuser:appgroup /usr/src/app

USER appuser

COPY --chown=root:root --chmod=755 ./dist /usr/src/app/dist

EXPOSE 5002

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "./dist/main.js"]