# FaceGIF API

This little API concatenate your images into a GIF.

**Source Docker image:** `docker pull quay.io/akos/node-im-ffmpeg`

**Docker image:** `docker pull quay.io/akos/facegif-api`

**Docker container start:**
```
docker run quay.io/akos/node-im-ffmpeg
```

**Example call**

```JavaScript/JSON
{
    "images": [
      'http://cdstorage.azureedge.net/clipdis-app-clips/5416cbb4f6ece1d465f53775.jpg',
      'http://cdstorage.azureedge.net/clipdis-app-clips/56fbd92f3b5a2a1200f90535.jpg',
      'http://cdstorage.azureedge.net/clipdis-app-clips/55a61dfafd24702626af5104.jpg'
    ],
    "fileName": "hello.gif"
}
```
