FROM node:22
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY src/. src/.

EXPOSE 53706
CMD [ "npm", "start" ]