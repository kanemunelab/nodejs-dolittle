$(function(){
  /*var saveWindowBg=$("<div id=\"saveWindowBg\" class=\"saveWindowBg\"></div>");
  var saveWindow=$("<div id=\"saveWindow\" class=\"saveWindow well\"></div>").appendTo(saveWindowBg);
  var container=$("<div class=\"container\"></div").appendTo(saveWindow);
  var fileTable=$("<table id=\"fileTable\"></table>").appendTo(container);
  var fileListColmunLabels=$("<thead id=\"fileListColmunLabels\"></thead>").appendTo(fileTable);
  var fileList=$("<tbody id=\"fileList\"></tbody>").appendTo(fileTable);*/
  //saveWindowBg.appendTo($("body"));

  var fileList=$("#fileList");
  var fileListTr=$("#fileList tr");

  $("#fileListColumnLabels").append($("<tr class=\"row\"><th class=\"col-xs-6\">ファイル名</th><th class=\"col-xs-6\">更新日時</th></tr>"));

  $("#load").click(function(){
    $("#saveWindowBg").show();
    fs.progDirFileListAsync(function(err,files){
      if(err)throw err;
      files.map(function(k){
        if(!k.match(/\.dtl$/))return;
        var obj={};
        obj['filename']=k;
        obj['timestamp']="---";
        //var option=$("<option value=\""+k+"\">"+k+"</option>");
        //option.appendTo($("#files"));
        addToFileList(obj);
      });
    }.bind(this));
    //addToFileList({"filename":"hoge.dtl","timestamp":"---"});
    return false;

  });

  var addToFileList =function(obj){
    var filename=obj['filename'];
    var timestamp=obj['timestamp']||'---';
    var tr=$("<tr class=\"row\"></tr>");
    tr.append($("<td class=\"col-xs-6\">"+filename+"</td>"));
    tr.append($("<td class=\"col-xs-6\">"+timestamp+"</td>"));
    tr.appendTo(fileList);
    setDefault(tr);
    setClick(tr);
  };
  $("#saveWindowBg").click(function(){
    $("#saveWindowBg").hide();
    return false;
  });
  $("#saveWindow").click(function(){
    event.stopPropagation();
  });

  function setDefault(file){
    file.css("background-color","#FFFFFF");
    file.mouseover(function(){
      $(this).css("background-color","#CCFFCC") .css("cursor","pointer")
    });
    file.mouseout(function(){
      $(this).css("background-color","#FFFFFF").css("cursor","normal")
    });
  }

  function setClick(file){
    file.click(function(){
      setDefault($("#fileList tr"));
      $(this).css("background-color","yellow");
      $(this).mouseover(function(){
        $(this).css("background-color","yellow") .css("cursor","pointer")
      });
      $(this).mouseout(function(){
        $(this).css("background-color","yellow").css("cursor","normal")
      });
    });
  }
});
