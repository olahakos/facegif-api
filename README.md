# FaceGIF API

This little API concatenate your images into a GIF.

**Docker image:** `docker pull quay.io/akos/node-im-ffmpeg`

**Example call**

```JavaScript/JSON
{
    "images": [
        "https://raw.githubusercontent.com/olahakos/facegif-api/dev/mock/1.jpg",
        "http://cdstorage.azureedge.net/clipdis-app-clips/5416cbb4f6ece1d465f53775.jpg",
        "http://cdstorage.azureedge.net/clipdis-app-clips/53bfca62bcaa800f7eacfda7.jpg",
        "https://raw.githubusercontent.com/olahakos/facegif-api/dev/mock/2.jpg"
    ],
    "fileName": "hello.gif"
}
```
