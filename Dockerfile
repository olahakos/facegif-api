FROM quay.io/akos/node-im-ffmpeg

ADD ./ /opt/facegif/
WORKDIR /opt/facegif/

RUN rm -rf node_modules
RUN npm cache clean
RUN npm install

ARG MONGO_URI
ENV MONGO_URI $MONGO_URI

RUN npm test

CMD npm start
