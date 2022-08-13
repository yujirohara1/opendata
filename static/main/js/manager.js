window.onload = function(){
  //btnFileImport
  document.getElementById("btnFileImport").classList.add("disabled");
}






//ファイル取り込みボタンクリック
document.getElementById("btnFileImport").addEventListener('click', function() {
  var files = document.querySelector('#inpFileImport').files
  let formData = new FormData();
  formData.append('excelFile', files[0]);

  fetch('/updateFiles', {
    method: 'PUT',
    body: formData,
  })
  .then(res => res.json())
  .then(jsonData => {
    var list = JSON.parse(jsonData.data);
    document.getElementById("msgFileImportDescribe").innerText = list.length + "シートで構成されるExcelファイルを検出しました。";
    destroyTableLoading("divAssignedTableArea");
    var hdText = ["シート名", "列数", "行数", "収集", "状態"];
    var hdColWidth = ["45%","10%","10%","15%","20%"];
    var tableId = initTable("divAssignedTableArea", hdText, hdColWidth,5);
    var tbody = document.getElementById(tableId+"Body");

    for(let i in list){
      var trow = document.createElement('tr');
      var td1 = document.createElement('td');
      var td2 = document.createElement('td');
      var td3 = document.createElement('td');
      var td4 = document.createElement('td');
      var td5 = document.createElement('td');
      td1.innerText = list[i].sheetName; // "a"; //list[i].user_name=="" ? list[i].assigned_to:list[i].user_name;
      td2.innerText = list[i].colSize; // "a"; //list[i].user_name=="" ? list[i].assigned_to:list[i].user_name;
      td3.innerText = list[i].rowSize; // "a"; //list[i].user_name=="" ? list[i].assigned_to:list[i].user_name;
      td4.appendChild(buttonHtmlCollectData(list[i].fileName, list[i].sheetName, list[i].rowSize));
      td5.innerText = "";
      td1.classList.add("tdcell-left");
      td2.classList.add("tdcell-center");
      td3.classList.add("tdcell-center");
      td4.classList.add("tdcell-center");
      td5.classList.add("tdcell-left");
      trow.appendChild(td1);
      trow.appendChild(td2);
      trow.appendChild(td3);
      trow.appendChild(td4);
      trow.appendChild(td5);
      tbody.appendChild(trow);
    }

    //document.querySelector('#lblFileProperty').innerHTML = "取り込み完了！"; //jsonData.data;
    //document.getElementById('btnFileImport').classList.remove("disabled");
  })
  .catch(error => { console.log(error); });

  createTableLoading("divAssignedTableArea","担当者IDごとに集計しています・・・")

  document.getElementById('btnFileImport').classList.add("disabled");

});


//取り込みファイルを指定
document.getElementById("inpFileImport").addEventListener('change', function() {

  var filepath = document.getElementById("inpFileImport").value;
  var tmp = filepath.split(".");
  var extention = tmp[tmp.length-1].toLowerCase();

  document.getElementById("btnFileImport").classList.add("disabled");
  if(extention=="xls" || extention=="xlsx" || extention=="csv"){
    document.getElementById("btnFileImport").classList.remove("disabled");
    document.getElementById("msgFileImport").innerText = "";
  } else {
    document.getElementById("msgFileImport").innerText = "xls, xlsx, csv のいずれかを指定してください。";
  }
});






//ローダーを削除
function destroyTableLoading(locationId){
  var tmp = document.getElementById(locationId); 
  while(tmp.lastChild){
    tmp.removeChild(tmp.lastChild);
  }
  document.getElementById(locationId).style.height = "";
}




// テーブル内のデータが表示されるまでの間、小さいローダーを枠内に表示
function createTableLoading(locationId, messageLabel){
  var tmp = document.getElementById(locationId);
  if(tmp!=null){
    while(tmp.lastChild){
      tmp.removeChild(tmp.lastChild);
    }
  }
  let tableDiv = document.createElement('div');
  tableDiv.classList.add("loadingDiv");
  document.getElementById(locationId).style.height = "calc(100vh/3)";
  //tableDiv.id = tableDivId;
  let messageDiv = document.createElement('div');
  messageDiv.id = locationId + "Caption";
  messageDiv.innerText = messageLabel
  document.getElementById(locationId).appendChild(messageDiv);
  document.getElementById(locationId).appendChild(tableDiv);
}


/*
|| HTMLTableを作る
*/
function initTable(tableDivId, hdText, hdWidth, heightRatio){
  var tableId = tableDivId.replace("div","htmlTable");
  var table = document.createElement("table");
  table.id = tableId;

  var thead = document.createElement('thead');
  var tbody = document.createElement('tbody');
  tbody.id = tableId + "Body";
  thead.appendChild(createTableHeader(hdText, hdWidth));

  table.appendChild(thead);
  table.appendChild(tbody);

  table.classList.add("table", "table-bordered", "table_sticky", "table-hover", "fs-6");
  table.style.height = "calc(100vh/" + heightRatio + ")";

  var tmp = document.getElementById(tableDivId);
  while(tmp.lastChild){
    tmp.removeChild(tmp.lastChild);
  }

  document.getElementById(tableDivId).appendChild(table);

  return tableId;
}

//テーブルの見出し行を作成する。戻したDOMはtheadにappendされる想定。
function createTableHeader(hdText, width){
  let trow = document.createElement('tr');
  for (let hd in hdText){
    var thA = document.createElement('th');
    thA.innerHTML = hdText[hd];
    thA.style.textAlign = "center";
    thA.style.verticalAlign = "middle";
    if(width!=null){
      try{thA.style.width=width[hd];}catch(e){
        openErrorMessageDialog(e.message);
      }
    }
    trow.appendChild(thA);
  }
  return trow;
}



function setAttributes(dom, str){
  var tmp = str.split("/");
  for (let a in tmp){
    b = tmp[a].split(",");
    dom.setAttribute(b[0], b[1]);
  }
}




function buttonHtmlCollectData(fileName, sheetName, rowSize){
  //%a#btnGetMaxNo.btn.btn-dark.btn-sm(type="button")
  var btn = document.createElement('a');
  btn.classList.add("btn","btn-primary","btn-sm");
  //btn.id = "btnUpdateDutyMemberList_" + dutyDate;
  setAttributes(btn,"type,button/dummy,dummy");
  btn.innerText = "収集開始";
  btn.style.paddingBottom = "1px";
  btn.style.paddingTop = "1px";
  btn.style.fontSize = "11.5px";

  btn.addEventListener('click', function() {
    event.target.classList.add("disabled");
    hoge(fileName, sheetName, rowSize, 0);
    
  });
  return btn;
}

function hoge(fileName, sheetName, rowSize, rowId){
  fetch('/collectSheetData/' + fileName + "/" + sheetName + "/" + rowId, {
    method: 'GET',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(jsonData => {
    var list = JSON.parse(jsonData.data);
    //alert(list[0].rowId);
    if(list[0].rowId >= (rowSize-1)){
      return;
    }else{
      hoge(list[0].fileName, list[0].sheetName, rowSize, Number(list[0].rowId)+1);
    }
    // if(value==0){
    //   SetAllDisabledDutyList();
    //   //alert("登録しました。");
    // }
  })
  .catch(error => { 
    //document.getElementById("divLabelProcessing0").innerText = error;//console.log(error); 
    //openErrorMessageDialog(error);
    alert(1);
  });
}