var Infinito = 1000;
/*grafo = new Object();
grafo.numVertices = undefined;
grafo.vArray = new Array(1000);*/

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

function geraMatrizFloyd() {}

function createCellsBody(rowPai, numVertices, linha, floyd) {
  var vlinha = new Array(numVertices);
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
      input.min = "0";
      input.max = "1000";
      td.appendChild(input);

      if (floyd == "criação") {
        input.id = "iptC-" + linha + "-" + i;
        input.value = Infinito;
      } else if (floyd == "montagem") {
        input.id = "iptS-" + linha + "-" + i;
        var cellEntrada = document.getElementById("iptC-" + linha + "-" + i);
        input.value = cellEntrada.value;
      }
      vlinha[i] = input.value;
    }
    grafo.vArray[linha] = vlinha;
  }
}

function criaRowBody(headBodPai, numVertices, floyd) {
  for (var i = 0; i < numVertices; i++) {
    var tableHead = document.getElementById(headBodPai);
    var Row = document.createElement("tr");

    tableHead.appendChild(Row);
    Row.id = tableHead.id + "tr" + i;
    createCellsBody(Row.id, numVertices, i, floyd);
  }
}

function criaTableBody(tablePai, numVertices, floyd) {
  var table = document.getElementById(tablePai);
  var tableBody = document.createElement("tbody");

  table.appendChild(tableBody);
  tableBody.id = table.id + "tbody";
  criaRowBody(tableBody.id, numVertices, floyd);
}

function criaTabela(divPai, numVertices, enunciado, floyd) {
  var div = document.getElementById(divPai);
  var table = document.createElement("table");
  var p = document.createElement("p");

  div.style.display = "block";

  div.appendChild(p);
  p.appendChild(document.createTextNode(enunciado));
  div.appendChild(table);
  table.id = divPai + "Table";

  criaTableHeader(table.id, numVertices);
  criaTableBody(table.id, numVertices, floyd);
}

function criaTexto(divPai, text) {
  var div = document.getElementById(divPai);
  var hr1 = document.createElement("hr");
  var p = document.createElement("p");
  var hr2 = document.createElement("hr");

  div.appendChild(hr1);
  div.appendChild(p);
  div.appendChild(hr2);
  p.appendChild(document.createTextNode(text));
}

function montaTabela(numVertices) {
  for (var k = 0; k < numVertices; k++) {
    for (var i = 0; i < numVertices; i++) {
      for (var j = 0; j < numVertices; j++) {
        //var a = parseInt(grafo.vArray[i][k]);
        // var b = parseInt(grafo.vArray[k][j]);
        var soma = parseInt(grafo.vArray[i][k]) + parseInt(grafo.vArray[k][j]);
        if (soma < parseInt(grafo.vArray[i][j])) {
          grafo.vArray[i][j] = soma;
          var input = document.getElementById("iptS-" + i + "-" + j);
          input.value = soma;
        }
      }
    }
  }
}

function geraDivSaida() {
  var div = document.getElementById("saidaGrafo");
  div.innerHTML = "";
  div.style.display = "block";

  var numVertices = document.getElementById("numVertices").value;

  criaTabela(
    "saidaGrafo",
    numVertices,
    "A matriz a seguir mostra o resultado da matriz de adjacencia" +
      " após a aplicação do Algoritimo de Floyd Warsall para encontrar a menor distância entre os vértices:",
    "montagem"
  );
  montaTabela(numVertices);
}

function criaBotao(divPai) {
  var pai = document.getElementById(divPai);
  pai.innerHTML =
    "<button class='buttonStyle1' onClick = 'geraDivSaida()'>OK</button><br>";
}

function confirmation(divPai, numVertices) {
  if (
    confirm(
      "O número de vértices digitado é " + numVertices + ", deseja confirmar?"
    )
  ) {
    document.getElementById(divPai).innerHTML = "";
    var divSaida = document.getElementById("saidaGrafo");
    divSaida.innerHTML = "";
    divSaida.style.display = "none";

    grafo = new Object();
    grafo.numVertices = numVertices;
    grafo.vArray = new Array(numVertices);

    //grafo.numVertices = numVertices;

    criaTabela(
      divPai,
      numVertices,
      "Por favor, informe os valores para a tabela de adjacencia a seguir e clique em OK para prosseguir:" +
        "(ATENÇÃO: Sabe-se que a maior distancia entre um par de vértices é INFINITO," +
        " então para representar essa distancia foi definido o valor '1000').",
      "criação"
    );
    criaTexto(
      divPai,
      "Após o preenchimento adequado da tabela acima clique em 'OK' para gerar a matriz" +
        " de menor distancias entre os pares de vértices."
    );
    var divPaidaFilha = document.getElementById(divPai);
    var divFilha = document.createElement("div");
    divPaidaFilha.appendChild(divFilha);
    divFilha.id = "filha";

    criaBotao(divFilha.id);
  }
}

function informaVertices(divPai) {
  var numVertices = document.getElementById("numVertices").value;
  if (numVertices != "") {
    confirmation(divPai, numVertices);
  }
}
