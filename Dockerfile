FROM node

WORKDIR /srv

COPY . . 

RUN npm remove sqlite3
RUN npm install sqlite3

CMD ["node", "index.js"]