var fs=(function(){
  var _fs=require('fs');
  this.readFile=function(filename){
    return _fs.readFileSync("./dtl/"+filename).toString();
  };
  this.writeFile=function(filename,src){
    _fs.writeFile("./dtl/"+filename,src);
  };
  this.writeRunFile=function(src){
    _fs.writeFile("./js/runtime/run/run.js",src);
  };
  this.getProgDirFileListSync=function(){
    return _fs.readdirSync("./dtl/");
  };
  this.progDirFileListAsync=function(func){
    _fs.readdir("./dtl/",func);
  };
  return this;
})();
