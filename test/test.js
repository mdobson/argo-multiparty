var argo = require('argo');
var argoMultiparty = require('../');
var fs = require('fs');

argo()
  .use(argoMultiparty)
  .use(function(handle) {
    handle('request', function(env, next) {

      var file = env.multiparty.files.filedata[0];

      var rs = fs.createReadStream(file.path);
      var ws = fs.createWriteStream(file.originalFilename + '0');

      rs.pipe(ws);
      env.response.statusCode = 201;
      next(env)

    });
  })
  .listen(3000);


