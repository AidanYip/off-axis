FROM node:20

COPY . /app
WORKDIR /app

RUN npm ci

ENV NODE_ENV Production
EXPOSE 5001

CMD ["npm", "start"]