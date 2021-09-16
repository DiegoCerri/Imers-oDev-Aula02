var data = new Date();
var mes = data.getMonth() + 1; //retorno é de 0-11
var dia = data.getDate() - 1; //sempre cotação dia anterior
var ano = data.getFullYear();
var dataCompleta = mes + "-" + dia + "-" + ano;
document.getElementById("dataD").innerHTML = dataCompleta;

var mURL = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dataCompleta}'&$format=json`;

function reqListener() {
  var resposta = JSON.parse(this.responseText);
  var valores = resposta.value[0];
  document.getElementById("dolar").innerHTML = valores.cotacaoCompra;
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", mURL);
oReq.send();

function Converter() {
  var real = Number.parseFloat(document.getElementById("valorR").value);
  var dolar = Number.parseFloat(document.getElementById("valorD").value);
  var cambio = document.getElementById("dolar").innerHTML;

  if (real > "0") {
    document.getElementById("valorD").value = (real / cambio).toFixed(2);
  } else {
    document.getElementById("valorR").value = (dolar * cambio).toFixed(2);
  }
}

function Limpar() {
  document.getElementById("valorD").value = null;
  document.getElementById("valorR").value = null;
}