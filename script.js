const elementoConsumido = document.getElementById('total');
const botaoTotal = document.getElementById('string-total');
const botaoBeber = document.getElementById('maisAgua');
const botaoResetar = document.getElementById('menosAgua');
const elementoMetaDiaria = document.getElementById('metaDiaria');

let quantidadeConsumida = parseInt(localStorage.getItem('quantidadeConsumida')) || 0;
let metaDiaria = 2500; 

const tamanhoGarrafa = 500;

const urlParams = new URLSearchParams(window.location.search);
const metaDiariaParam = urlParams.get('metadiaria');

if (metaDiariaParam) {
    metaDiaria = parseInt(metaDiariaParam);
}

var parabens = ""; 

var litrosm = metaDiaria / 1000;

elementoConsumido.textContent = litrosm.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " Litros" + parabens;
elementoMetaDiaria.textContent = (metaDiaria / 1000).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " Litros";


function updateDiario() {
    const hoje = new Date();
    const dataUltimaAtualizacao = localStorage.getItem('dataUltimaAtualizacao');

    if (!dataUltimaAtualizacao || new Date(dataUltimaAtualizacao).getDate() !== hoje.getDate()) {
        localStorage.setItem('dataUltimaAtualizacao', hoje);
        quantidadeConsumida = 0;
        atualizarQuantidadeConsumida();
    }
}

function atualizarQuantidadeConsumida() {
    var parabens = "";

    if (quantidadeConsumida >= metaDiaria) {
        parabens = " 🎉";
        elementoConsumido.style.background = "#FFA500";
    } else {
        elementoConsumido.style.background = "#30c8e1";
    }

    var litros = quantidadeConsumida / 1000;

    elementoConsumido.textContent = litros.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " Litros" + parabens;

    localStorage.setItem('quantidadeConsumida', quantidadeConsumida);
}

function beberAgua() {
    quantidadeConsumida += tamanhoGarrafa;
    atualizarQuantidadeConsumida();
}

function apagarRegistro() {
    if (quantidadeConsumida >= tamanhoGarrafa) {
        quantidadeConsumida -= tamanhoGarrafa;
        atualizarQuantidadeConsumida();
    }
}

botaoBeber.addEventListener('click', beberAgua);
botaoResetar.addEventListener('click', apagarRegistro);

document.addEventListener("selectstart", function(e) {
    e.preventDefault();
});

updateDiario();
atualizarQuantidadeConsumida();
