var insert_char=function(str) {
  var strOriginal = document.form.prog.value;
  var posCursole = document.form.prog.selectionStart;
  var leftPart = strOriginal.substr(0, posCursole);
  var rightPart = strOriginal.substr(posCursole, strOriginal.length);
  document.form.prog.value = leftPart + str + rightPart;
}
//TODO ファイル保存時、$("#files")に追加
$(function () {
  fs.fileListAsync(function(err,files){
    if(err)throw err;
    files.map(function(k){
      if(!k.match(/\.dtl$/))return;
      var option=$("<option value=\""+k+"\">"+k+"</option>");
      option.appendTo($("#files"));
    });
  });
  $("#run").click(function(){
    var src=editor.getSession().getValue();
    try{
      var dtlNode=MinimalParser.parseAsNode(src);
    }catch(e){
      alert(e);
      return;
    }
    /*if (src.match(/RUN_AT_SERVER/)) {
        var vmc=MinimalParser.node2vm(dtlNode);
        var vmcj=JSON.stringify(vmc);
        console.log("VM Code", vmcj);
        var svurl="../../php/dtlfs.php";
        $.post(svurl,{script: vmcj}).then(function (res){
            console.log(res);
          (iframe.contentWindow.timer_stopper)?iframe.contentWindow.timer_stopper():null;
            iframe_document.open();
            iframe_document.writeln("<html><body>"+res+"</body></html>");
        }).fail(function (res) {
            console.log("ERR",res.responseText);
            alert(res.responseText);
        });
        return;
    }*/
    var dtl=MinimalParser.node2js(dtlNode);
    fs.writeRunFile(dtl);
    //dtl=js_beautify(dtl);
    console.log(dtl);

    window.open("./run.html");
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
  $("#load").click(function(){
    var filename=$("#files").val();
    if(filename=="___nofile___")return;
    var src=fs.readFile(filename);
    editor.setValue(src);
  });
  /*$("#samples").change(function () {
    $("#prog").val( $("#prog_"+this.value).val());
  });*/
  if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
    $("#sb").click(function() {insert_char("「」");});
    $("#paren").click(function() {insert_char("（）");});
    $("#exc").click(function() {insert_char("！");});
    $("#ques").click(function() {insert_char("？");});
    $("#maru").click(function() {insert_char("。");});
    $("#stick").click(function() {insert_char("｜｜");});
    $("#equ").click(function() {insert_char("＝");});
    $("#add").click(function() {insert_char("＋");});
    $("#sub").click(function() {insert_char("−");});
    $("#mul").click(function() {insert_char("×");});
    $("#div").click(function() {insert_char("÷");});
    $("#dq").click(function() {insert_char("\”\”");});
    $("#colon").click(function() {insert_char(":");});
  }
});
