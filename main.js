/**
 * Você foi contratado para criar uma calculadora de descontos para uma cafeteria online. O objetivo é criar um programa em JavaScript que calcula o valor final de um produto após aplicar descontos. Além disso, você deve criar categorias pra esse produto e ao final mostrar uma tabela dos produtos e outra sendo cada categoria uma coluna, e cada produto uma linha.
 * 
 */

const listaProdutosInformados = [];

const nomeDoProdutoInput = document.getElementById("nomeDoProduto");
const valorDoProdutoInput = document.getElementById("valorDoProduto");
const tipoDeDescontoInput = document.getElementsByName("tipoDeDesconto");
const categoriaInput = document.getElementById("categoria");
const visualizacao = document.getElementById("visualizacao");
const visualizacaoCategoria = document.getElementById("visualizacaoCategoria");

const btnCalcular = document.getElementById("btnCalcular");

class Produto {
  constructor(nome, valorBruto, valorFinal) {
    this.nome = nome;
    this.valorBruto = valorBruto;
    this.valorFinal = valorFinal;
  }

  nome = "";
  valorBruto = 0;
  valorFinal = 0;
}

class Categoria {
  listaDeSalgado = [];
  listaDeDoce = [];
  listaDeBebida = [];
}

const categorias = new Categoria();

function limparInputs() {
  nomeDoProdutoInput.value = ''
  valorDoProdutoInput.value = ''
}


function criaObjetoProduto(nome, valorBruto, tipoDeDesconto) {
  var valorFinal = retornaDesconto(valorBruto, tipoDeDesconto);
  adicionarProdutoNaLista(nome, valorBruto, valorFinal);
}

function retornaDesconto(valorBruto, tipoDeDesconto) {
  var valorFinal = 0.0;

  switch (tipoDeDesconto) {
    case "aVista":
      valorFinal = valorBruto * 0.95;
      break;

    case "parcelado":
      valorFinal = valorBruto * 1.05;
      break;
  }

  return valorFinal;
}

function adicionarProdutoNaCategoria(produto) {
  const categoriaIndex = categoriaInput.selectedIndex;
  const categoria = categoriaInput[categoriaIndex].value;

  switch (categoria) {
    case "salgado":
      categorias.listaDeSalgado.push(produto);
      break;

    case "doce":
      categorias.listaDeDoce.push(produto);
      break;

    case "bebida":
      categorias.listaDeBebida.push(produto);
      break;
  }
}

function adicionarProdutoNaLista(nome, valorBruto, valorFinal) {
  var produto = new Produto(nome, valorBruto, valorFinal);
  adicionarProdutoNaCategoria(produto);
  listaProdutosInformados.push(produto);
  console.log(categorias)
}

function quandoClicarNoBotao() {
  const nomeDoProduto = nomeDoProdutoInput.value;
  const valorDoProduto = Number(valorDoProdutoInput.value);
  let tipoDeDesconto = "";

  if (nomeDoProduto.length === 0 || valorDoProduto === 0) {
    alert("Insira as informações para executar a ação!")
    return 
  }

  for (
    var inputIndex = 0;
    inputIndex < tipoDeDescontoInput.length;
    inputIndex++
  ) {
    if (tipoDeDescontoInput[inputIndex].checked) {
      tipoDeDesconto = tipoDeDescontoInput[inputIndex].value;
    }
  }

  if (tipoDeDesconto.length === 0) {
    alert("Escolha uma opção de desconto!");
    return;
  }

  criaObjetoProduto(nomeDoProduto, valorDoProduto, tipoDeDesconto);
  adicionarProdutosNoHtml();
  adicionarCategoriasNoHtml();
  limparInputs()
}

function adicionarProdutosNoHtml() {
  visualizacao.innerHTML = `
    <tr>
      <th>Nome do produto</th>
      <th>Valor bruto</th>
      <th>Valor final</th>
    </tr>
  `;

  var index = 0;

  while (index != listaProdutosInformados.length) {
    visualizacao.innerHTML += `
      <tr>
        <td>${listaProdutosInformados[index].nome}</td>
        <td>${listaProdutosInformados[index].valorBruto}</td>
        <td>${listaProdutosInformados[index].valorFinal}</td>
      </tr>
    `;
    index++;
  }
}

function adicionarCategoriasNoHtml() {
  visualizacaoCategoria.innerHTML = `
    <tr>
      <th>Salgado</th>
      <th>Doce</th>
      <th>Bebida</th>
    </tr>
  `;

  var index = 0;

  while (index != listaProdutosInformados.length) {
    let nomeProdutoSalgado = categorias.listaDeSalgado[index]
      ? categorias.listaDeSalgado[index].nome
      : "";
    let nomeProdutoDoce = categorias.listaDeDoce[index]
      ? categorias.listaDeDoce[index].nome
      : "";
    let nomeProdutoBebida = categorias.listaDeBebida[index]
      ? categorias.listaDeBebida[index].nome
      : "";

    visualizacaoCategoria.innerHTML += `
      <tr> 
        <td>${nomeProdutoSalgado}</td>
        <td>${nomeProdutoDoce}</td>
        <td>${nomeProdutoBebida}</td>
      </tr>
    `;
    index++;
  }
}

btnCalcular.addEventListener("click", quandoClicarNoBotao);
