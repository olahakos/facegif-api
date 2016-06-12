## API Endpoints

<dl>
<dt><a href="#POST /gif">POST /gif</a> ⇒ <code>Object</code></dt>
<dd><p>Generate a gif sequence from the given images
To increase th testing I used dependency injection here</p>
</dd>
<dt><a href="#GET /status">GET /status</a> ⇒ <code>Object</code></dt>
<dd><p>Display API status</p>
</dd>
</dl>

## Utils

<dl>
<dt><a href="#gifMaker">gifMaker</a> ⇒ <code>string</code></dt>
<dd><p>Concatenate the given images into a .gif</p>
</dd>
</dl>

<a name="POST /gif"></a>

## POST /gif ⇒ <code>Object</code>
Generate a gif sequence from the given images
To increase th testing I used dependency injection here

**Kind**: global API  
**Returns**: <code>Object</code> - fileName, and url to the generated gif  
**Example**  
```js
request: {
  "images": [
    'http://cdstorage.azureedge.net/clipdis-app-clips/5416cbb4f6ece1d465f53775.jpg',
    'http://cdstorage.azureedge.net/clipdis-app-clips/56fbd92f3b5a2a1200f90535.jpg',
    'http://cdstorage.azureedge.net/clipdis-app-clips/55a61dfafd24702626af5104.jpg'
  ],
  "fileName": "hello.gif"
}
```
**Example**  
```js
response: {
  fileName: "hello.gif",
  url: "http://facegif.azureedge.net/upload-test/hello.gif"
}
```
<a name="GET /status"></a>

## GET /status ⇒ <code>Object</code>
Display API status

**Kind**: global API  
**Returns**: <code>Object</code> - an object with some basic infos about the API  
**Example**  
```js
response: {
  "name": "facegif-api",
  "version": "1.0.0",
  "env": "development"
}
```
<a name="gifMaker"></a>

## gifMaker ⇒ <code>string</code>
Concatenate the given images into a .gif

**Kind**: global util  
**Returns**: <code>string</code> - path to the GIF file  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| imgArr | <code>Array</code> | Array of image urls or paths |
| outputFileName | <code>string</code> | name of the output GIF |

