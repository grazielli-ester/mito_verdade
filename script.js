const perguntas = [
    {
        pergunta: "Apenas mulheres com histórico na família podem ter câncer de mama?",
        resposta: "mito",
        explicacao: "A maioria dos casos acontece em mulheres sem nenhum caso na família. O histórico familiar aumenta o risco, mas qualquer pessoa pode ter a doença."
    },
    {
        pergunta: "Homens também podem ter câncer de mama?",
        resposta: "verdade",
        explicacao: "É raro (cerca de 1% dos casos), mas homens também têm tecido mamário e podem desenvolver a doença."
    },
    {
        pergunta: "O autoexame substitui a mamografia?",
        resposta: "mito",
        explicacao: "Conhecer o próprio corpo é importante, mas a mamografia consegue identificar alterações bem pequenas, antes mesmo de serem sentidas pelo toque."
    },
    {
        pergunta: "Todo nódulo no seio é câncer?",
        resposta: "mito",
        explicacao: "A maioria dos nódulos é benigna. Mesmo assim, qualquer alteração deve ser avaliada por um profissional de saúde."
    },
    {
        pergunta: "O câncer de mama sempre causa dor?",
        resposta: "mito",
        explicacao: "No início, geralmente não há dor. Por isso é tão importante fazer os exames de rotina, mesmo sem sintomas."
    },
    {
        pergunta: "Praticar atividade física e ter uma alimentação saudável ajudam a reduzir o risco?",
        resposta: "verdade",
        explicacao: "Manter o peso adequado, se exercitar, evitar o álcool e o cigarro são atitudes que ajudam na prevenção."
    },
    {
        pergunta: "Usar desodorante antitranspirante causa câncer de mama?",
        resposta: "mito",
        explicacao: "Não há comprovação científica de que desodorantes causem câncer de mama."
    },
    {
        pergunta: "Quando descoberto no início, o câncer de mama tem grandes chances de cura?",
        resposta: "verdade",
        explicacao: "Com o diagnóstico precoce, as chances de cura podem chegar a cerca de 95%. Fazer os exames em dia salva vidas!"
    }
];

const telaInicio = document.getElementById("tela-inicio");
const telaPergunta = document.getElementById("tela-pergunta");
const telaFinal = document.getElementById("tela-final");

const contador = document.getElementById("contador");
const textoPergunta = document.getElementById("pergunta");
const botoesResposta = document.querySelectorAll("#botoes .btn");
const resultado = document.getElementById("resultado");
const resultadoTitulo = document.getElementById("resultado-titulo");
const explicacao = document.getElementById("explicacao");
const btnProxima = document.getElementById("btn-proxima");
const pontuacao = document.getElementById("pontuacao");

let indiceAtual = 0;
let acertos = 0;

function mostrarTela(tela) {
    document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
    tela.classList.add("ativa");
}

function iniciarJogo() {
    indiceAtual = 0;
    acertos = 0;
    mostrarTela(telaPergunta);
    mostrarPergunta();
}

function mostrarPergunta() {
    const atual = perguntas[indiceAtual];

    contador.textContent = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;
    textoPergunta.textContent = atual.pergunta;

    botoesResposta.forEach(botao => botao.disabled = false);
    resultado.classList.add("escondido");
    resultado.classList.remove("acertou", "errou");

    btnProxima.textContent = indiceAtual === perguntas.length - 1 ? "Ver resultado" : "Próxima";
}

function responder(respostaEscolhida) {
    const atual = perguntas[indiceAtual];
    const acertou = respostaEscolhida === atual.resposta;

    botoesResposta.forEach(botao => botao.disabled = true);

    if (acertou) {
        acertos++;
        resultadoTitulo.textContent = "✅ Você acertou!";
        resultado.classList.add("acertou");
    } else {
        resultadoTitulo.textContent = "❌ Você errou!";
        resultado.classList.add("errou");
    }

    const respostaCerta = atual.resposta === "mito" ? "MITO" : "VERDADE";
    explicacao.textContent = `É ${respostaCerta}! ${atual.explicacao}`;
    resultado.classList.remove("escondido");
}

function proximaPergunta() {
    indiceAtual++;

    if (indiceAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        pontuacao.textContent = `Você acertou ${acertos} de ${perguntas.length} perguntas!`;
        mostrarTela(telaFinal);
    }
}

document.getElementById("btn-comecar").addEventListener("click", iniciarJogo);
document.getElementById("btn-reiniciar").addEventListener("click", iniciarJogo);
btnProxima.addEventListener("click", proximaPergunta);

botoesResposta.forEach(botao => {
    botao.addEventListener("click", () => responder(botao.dataset.resposta));
});
