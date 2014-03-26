var argo = require('argo');
var argoMultiparty = require('./');
var fs = require('fs');

argo()
  .use(argoMultiparty)
  .use(function(handle) {
    handle('request', function(env, next) {
      fs.readFile(env.multiparty.files.filedata[0].path, function(err, data) {
        if(err) {
          env.response.statusCode = 500;
          next(env);
        } else {
          fs.writeFile(env.multiparty.files.filedata[0].originalFilename + '0', data, function(err) {
            if(err) {
              env.response.statusCode = 500;
              next(env);
            } else {
              env.response.statusCode = 201;
              next(env);
            }
          });
        }
      });
    });
  })
  .listen(3000);


