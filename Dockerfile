FROM node:22-alpine
ENV NODE_ENV=production PORT=8080
WORKDIR /app
COPY --chown=1001:0 package.json ./
COPY --chown=1001:0 src ./src
USER 1001
EXPOSE 8080
CMD ["node", "src/server.js"]
