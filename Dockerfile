FROM node:argon-slim

RUN echo "deb http://www.deb-multimedia.org jessie main non-free" >>  /etc/apt/sources.list
RUN echo "deb-src http://www.deb-multimedia.org jessie main non-free" >> /etc/apt/sources.list

RUN apt-get update
RUN apt-get install deb-multimedia-keyring -y --force-yes

# imagemagick
RUN apt-get update
RUN apt-get install imagemagick -y --force-yes

# FFMPEG
RUN apt-get update
RUN apt-get install ffmpeg -y

ADD ./ /opt/facegif/
WORKDIR /opt/facegif/

RUN rm -rf node_modules
RUN npm cache clean
RUN npm install

ARG MONGO_URI
ENV MONGO_URI $MONGO_URI

RUN npm test

CMD npm start
