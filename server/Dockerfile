FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN mkdir -p releases
EXPOSE 8420
ENV PORT=8420
CMD ["node", "server.js"]
