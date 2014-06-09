var _ = require('lodash');


module.exports = factory;

function factory(options,callback){
    return new Construct(options,callback);
}

function Construct(options,callback){


    var self = this;

    var _subdomain = require('../subdomain').subdomain(options.options);


    // "Protected" properties. We want modules like the blog to be able
    // to access these, thus no variables defined in the closure
    self._apos = options.apos;
    self._pages = options.pages;
    self._app = options.app;
    self._options = options;
    self._schemas = options.schemas;


    self.middleware = [
      function(req,res,done){

          //check if we are using both subdomain an domain

          if(_subdomain.redirectIfNecessary(req,res)){
              return;
          }

          req.url = _subdomain.url(req);
          done(req,res);
      }
    ];


    self.loader=function(req,callback){

        if(req.page){
            _subdomain.children(req);
        }

        callback(null);


    };
    if(callback){
        return process.nextTick(function(){
           return callback(null);
        });
    }
}

factory.Construct=Construct;

