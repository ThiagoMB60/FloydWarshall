function criaObjGrafo(numVertices) {
  var grafo = new Object();
  grafo.numVertices = numVertices;
  grafo.numVerticesArray = [numVertices][numVertices.length];
}

function createCellsHead(rowPai, numVertices) {
  for (var j = -1; j < numVertices; j++) {
    var row = document.getElementById(rowPai);
    var th = document.createElement("th");

    row.appendChild(th);
    var vertice = "v" + j;
    th.id = rowPai + vertice;
    if (j == -1) {
      vertice = document.createTextNode("X");
      th.style.backgroundColor = "red";
    } else {
      vertice = document.createTextNode(vertice);
    }
    th.appendChild(vertice);
  }
}

function criaRowHeader(headPai, numVertices) {
  var tableHead = document.getElementById(headPai);
  var Row = document.createElement("tr");

  tableHead.appendChild(Row);
  Row.id = tableHead.id + "tr";
  createCellsHead(Row.id, numVertices);
}

function criaTableHeader(tablePai, numVertices) {
  var table = document.getElementById(tablePai);
  var tableHead = document.createElement("thead");

  table.appendChild(tableHead);
  tableHead.id = tablePai + "thead";
  criaRowHeader(tableHead.id, numVertices);
}

function createCellsBody(rowPai, numVertices, linha) {
  for (var i = -1; i < numVertices; i++) {
    var row = document.getElementById(rowPai);

    if (i == -1) {
      var th = document.createElement("th");
      row.appendChild(th);
      var vertice = "v" + linha;
      th.id = row.id + vertice;
      vertice = document.createTextNode(vertice);
      th.appendChild(vertice);
      //***************************** */
    } else {
      var td = document.createElement("td");
      row.appendChild(td);
      var input = document.createElement("input");
      input.style.width = "60px";
      input.type = "number";
      input.value = 1000;
      input.min = "0";
      input.max = "1000";
      td.appendChild(input);
    }
  }
}

function criaRowBody(headBodPai, numVertices) {
  for (var i = 0; i < numVertices; i++) {
    var tableHead = document.getElementById(headBodPai);
    var Row = document.createElement("tr");

    tableHead.appendChild(Row);
    Row.id = tableHead.id + "tr" + i;
    createCellsBody(Row.id, numVertices, i);
  }
}

function criaTableBody(tablePai, numVertices) {
  var table = document.getElementById(tablePai);
  var tableBody = document.createElement("tbody");

  table.appendChild(tableBody);
  tableBody.id = table.id + "tbody";
  criaRowBody(tableBody.id, numVertices);
}

function criaTabela(divPai, numVertices, enunciado) {
  var div = document.getElementById(divPai);
  var table = document.createElement("table");
  var p = document.createElement("p");

  div.style.display = "block";

  div.appendChild(p);
  p.appendChild(document.createTextNode(enunciado));
  div.appendChild(table);
  table.id = divPai + "Table";

  criaTableHeader(table.id, numVertices);
  criaTableBody(table.id, numVertices);
}

function confirmation(divPai, numVertices) {
  if (
    confirm(
      "O número de vértices digitado é " + numVertices + ", deseja confirmar?"
    )
  ) {
    document.getElementById(divPai).innerHTML = "";
    criaObjGrafo(numVertices);
    criaTabela(
      divPai,
      numVertices,
      "Por favor, informe os valores para a tabela de adjacencia a seguir: (ATENÇÃO: Sabe-se que a maior distancia entre um par de vértices é INFINITO, então para representar essa distancia foi definido o valor '1000')."
    );
  }
}

function informaVertices(divPai) {
  var numVertices = document.getElementById("numVertices").value;
  if (numVertices != "") {
    confirmation(divPai, numVertices);
  }
}
