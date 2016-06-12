# FaceGIF API

This project is about to make cool GIF files from selfies. You can upload a bunch of images, it'll detect the faces on the pictures and merge them into a GIF. The faces are gonna be in the middle of the gif.

Currently the API knows only the [images] -> GIF conversion.

## Used technologies:
- [**NodeJS**](https://nodejs.org/en/) LTS with [**Koa framework**](http://koajs.com/)
- [**Docker**](https://hub.docker.com/), the docker repository is [**Quay.io**](https://quay.io)
- [**CircleCI**](https://circleci.com) to test, and build docker containers
- [**FFmpeg**](https://ffmpeg.org/) query the output metadata. I'll need this one in the future.
- [**Imagemagick**](http://www.imagemagick.org/script/index.php) to concatenate the images, and it'll help me the positioning, cropping...
- [**OpenCV**](https://www.npmjs.com/package/opencv) will help me find the faces on the images

## API documentation -> [here](api-reference.md)

## Docker
- **Source Docker image:**
```
docker pull quay.io/akos/node-im-ffmpeg
```
- **Docker image:**
```
docker pull quay.io/akos/facegif-api
```
- **Start Docker with Azure Storage:**
```
docker run --rm \
  --name facegif-api \
  -p 8000:3000 \
  --env AZURE_IN_USE=true \
  --env AZURE_STORAGE_ACCESS_KEY=${AZURE_STORAGE_ACCESS_KEY} \
  --env AZURE_STORAGE_ACCOUNT=${AZURE_STORAGE_ACCOUNT} \
  --env AZURE_STORAGE_CONTAINER=${AZURE_STORAGE_CONTAINER} \
  --env PORT=3000 \
  --env NODE_ENV=production \
  quay.io/akos/facegif-api:master
```
- **Start Docker without Azure Storage:**
```
docker run --rm \
  --name facegif-api \
  -p 8000:3000 \
  --env PORT=3000 \
  --env NODE_ENV=production \
  quay.io/akos/facegif-api:master
```
