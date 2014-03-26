##Multiparty Parsing for Argo

Simple middleware harnessing multiparty for parsing. The parsed multiparty result is thrown into `env.multiparty`.

Sample:

```
curl -i -X POST -H "Content-Type:multipart/form-data" -F name=test -F test=hello -F filedata=@test.txt http://localhost:3000/
```

```javascript
//Get a file upload. Write it's original filename +'0' to the main directory of this app.
var argo = require('argo');
var argoMultiparty = require('../');
var fs = require('fs');

argo()
  .use(argoMultiparty)
  .use(function(handle) {
    handle('request', function(env, next) {

      //filedata is the data parameter of the upload.
      //Everything if after a successful parse is placed into env.multiparty for access down the pipeline.
      var file = env.multiparty.files.filedata[0];

      var rs = fs.createReadStream(file.path);
      var ws = fs.createWriteStream(file.originalFilename + '0');

      rs.pipe(ws);
      env.response.statusCode = 201;
      next(env)

    });
  })
  .listen(3000);
```
