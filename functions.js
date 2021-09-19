function criaObjGrafo(numVertices) {
  var grafo = new Object();
  grafo.numVertices = numVertices;
  grafo.numVerticesArray = [numVertices][numVertices.length];
}

function createCellsHead(numVertices) {
  for (var i = -1; i < numVertices; i++) {
    var headRow = document.getElementById("thRow");
    var th = document.createElement("th");

    headRow.appendChild(th);
    var vertice = "v" + i;
    th.id = vertice;
    if (i != -1) {
      vertice = document.createTextNode(vertice);
    } else {
      vertice = document.createTextNode("X");
    }
    th.appendChild(vertice);
  }
}

function criaHeadRow(numVertices) {
  var tableHead = document.getElementById("theadInput");
  var headRow = document.createElement("tr");

  tableHead.appendChild(headRow);
  headRow.id = "thRow";
  createCellsHead(numVertices);
}

function criaTableHeader(numVertices) {
  var table = document.getElementById("inputTable");
  var tableHead = document.createElement("thead");

  table.appendChild(tableHead);
  tableHead.id = "theadInput";
  criaHeadRow(numVertices);
}

function criaTableBody(numVertices) {
  for (var i = 0; i < numVertices; i++) {
    var table = document.getElementById("inputTable");
    var tableBody = document.createElement("tbody");

    table.appendChild(tableBody);
    tableBody.id = "th" + i;
    tableBody.value = "v" + i;
  }
}

function entradaMatriz(numVertices) {
  var divEntrada = document.getElementById("entradaGrafo");
  var inputTable = document.createElement("table");
  var texto = document.createElement("p");

  divEntrada.style.display = "block";

  divEntrada.appendChild(texto);
  texto.appendChild(
    document.createTextNode(
      "Por favor, informe os valores para a tabela de adjacencia a seguir:"
    )
  );
  divEntrada.appendChild(inputTable);
  inputTable.id = "inputTable";

  criaTableHeader(numVertices);
  criaTableBody(numVertices);
}

function confirmation(numVertices) {
  if (
    confirm(
      "O número de vértices digitado é " + numVertices + ", deseja confirmar?"
    )
  ) {
    criaObjGrafo(numVertices);
    entradaMatriz(numVertices);
  }
}

function informaVertices() {
  var numVertices = document.getElementById("numVertices").value;
  if (numVertices != "") {
    confirmation(numVertices);
  }
}
