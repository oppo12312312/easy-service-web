FROM node:10.7.0

RUN mkdir -p /home/www/express

WORKDIR /home/www/express

COPY . /home/www/express

RUN npm install cnpm -g 

RUN rm -rf node_modules

RUN rm -rf ./upload/zip/*

RUN rm -rf ./upload/unzip/*

RUN cnpm i

RUN npm run build

EXPOSE 3000

CMD node index