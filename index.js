var multiparty = require('multiparty');

module.exports = function(handle) {
  handle('request', function(env, next) {
    if(env.request.method === 'POST' && env.request.headers['content-type'].indexOf('multipart/form-data') !== -1) {
      var form = new multiparty.Form();
      form.parse(env.request, function(err, fields, files) {
        if(err) {
          throw err;
        } else {
          env.multiparty = {};
          env.multiparty.fields = fields;
          env.multiparty.files = files;
          next(env);
        }
      });
    }else{
      next(env);
    }
  });
};
