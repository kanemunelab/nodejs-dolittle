var exe_window;

//TODO ファイル保存時、$("#files")に追加
$(function () {
  $("#run").click(function(){
    var src=editor.getSession().getValue();
    try{
      var dtlNode=MinimalParser.parseAsNode(src);
    }catch(e){
      alert(e);
      return;
    }
    var dtl=MinimalParser.node2js(dtlNode);
    //dtl="(new Thread(function(){"+dtl+"}.bind(window))).once();"
    fs.writeRunFile(dtl);
    //dtl=js_beautify(dtl);
    console.log(dtl);

    if(exe_window)exe_window.close();
    exe_window=window.open("./run.html");
  });
  $("#save").click(function(){
    var dtl=editor.getSession().getValue();
    var dtlNode,errFlag=false;
    try{
      dtlNode=MinimalParser.parseAsNode(dtl);
    }catch(e){
      errFlag=true;
      if(!confirm("プログラムに誤りがあります。\n保存しますか？"))return;
    }
    var filename=prompt("ファイル名を入力してください");
    if(!(filename+"")["length"])return;
    if(!(filename+"").match(/\.[a-zA-Z]+$/))filename+=".dtl";
    fs.writeFile(filename,dtl);
    //var list=$("#files").childen();
    //list.map(function(k){console.log(k);});
    if(!errFlag){
      var js=MinimalParser.node2js(dtlNode);
      fs.writeFile(filename+".js",js);
    }
    var filesList=$("#files").children();
    var filenameList=[];

  });
  /*$("#load").click(function(){
    $("#saveWindowBg").show();
    var filename=$("#files").val();
    if(filename=="___nofile___")return;
    var src=fs.readFile(filename);
    editor.setValue(src);
  });*/
});
