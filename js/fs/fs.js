var fs=(function(){
  var fs=require('fs');
  this.readFile=function(filename){
    return fs.readFileSync("./dtl/"+filename).toString();
  };
  this.writeFile=function(filename,src){
    fs.writeFile("./dtl/"+filename,src);
  };
  this.writeRunFile=function(src){
    fs.writeFile("./js/runtime/run/run.js",src);
  };
  this.getProgDirFileListSync=function(){
    return fs.readdirSync("./dtl/");
  };
  this.progDirFileListAsync=function(func){
    fs.readdir("./dtl/",func);
  };
  return this;
})();
