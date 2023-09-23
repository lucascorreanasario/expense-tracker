const saldo = document.getElementById('balance');
const dinheiroMais = document.getElementById('money-plus');
const dinheiroMenos = document.getElementById('money-minus');
const lista = document.getElementById('list');
const formulario = document.getElementById('form');
const texto = document.getElementById('text');
const valor = document.getElementById('amount');

const modal = document.getElementById('transactionModal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');

openModalBtn.addEventListener('click', function() {
    modal.style.display = "block";
});

closeModalBtn.addEventListener('click', function() {
    modal.style.display = "none";
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

//modal


const transacoesLocalStorage = JSON.parse(localStorage.getItem('transactions'));

let transacoes = localStorage.getItem('transactions') !== null ? transacoesLocalStorage : [];

// Adicionar transação
function adicionarTransacao(e) {
  e.preventDefault();

  if(texto.value.trim() === '' || valor.value.trim() === '') {
    alert('Por favor, adicione um texto e um valor');
  } else {
    const transacao = {
      id: gerarID(),
      texto: texto.value,
      valor: +valor.value
    };

    transacoes.push(transacao);

    adicionarTransacaoDOM(transacao);

    atualizarValores();

    atualizarArmazenamentoLocal();

    texto.value='';
    valor.value = '';
  }
}

// Gerar ID aleatório
function gerarID() {
  return Math.floor(Math.random() * 100000000);
}

// Adicionar transações à lista DOM
function adicionarTransacaoDOM(transacao) {
  // Obter sinal
  const sinal = transacao.valor < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Adicionar classe com base no valor
  item.classList.add(transacao.valor < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transacao.texto} <span>${sinal}${Math.abs(transacao.valor)}</span> <button class="delete-btn" onclick="removerTransacao(${transacao.id})">x</button>
  `;

  lista.appendChild(item);
}

// Atualizar o saldo, renda e despesa
function atualizarValores() {
  const valores = transacoes.map(transacao => transacao.valor);

  const total = valores.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const renda = valores
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const despesa = (valores
    .filter(item => item < 0)
    .reduce((acc, item) =>(acc += item), 0) * -1)
    .toFixed(2);

  saldo.innerText = `R$${total}`;
  dinheiroMais.innerText = `R$${renda}`;
  dinheiroMenos.innerText = `R$${despesa}`;
}

// Remover transação por ID
function removerTransacao(id) {
  transacoes = transacoes.filter(transacao => transacao.id !== id);

  atualizarArmazenamentoLocal();

  inicializar();
}

// Atualizar transações no armazenamento local
function atualizarArmazenamentoLocal() {
  localStorage.setItem('transactions', JSON.stringify(transacoes));
}

// Inicializar aplicativo
function inicializar() {
  lista.innerHTML = '';

  transacoes.forEach(adicionarTransacaoDOM);
  atualizarValores();
}

inicializar();

formulario.addEventListener('submit', adicionarTransacao);
