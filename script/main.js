let quantidadePerguntas;
let quantidadeNiveis;
let url;
let tituloQuizz;
let objetosAPI = [];
let quizz = [];
let numPergunta;
num = 0;

//Tela 1 JS

function listarTodosQuizzes() {
  let promise = axios.get(
    "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes"
  );
  promise.then(renderizarTodosQuizzes);
}

function renderizarTodosQuizzes(resposta) {
  let todosQuizzes = document.querySelector(".quizzes");
  objetosAPI = resposta.data;
  console.log(objetosAPI);
  for (let i = 0; i < resposta.data.length; i++) {
    todosQuizzes.innerHTML += `<div class="quizz" onclick="abrirQuizz('${resposta.data[i].id}')">
        <img src="${resposta.data[i].image}">
        <p class="titulo-quizz">${resposta.data[i].title}</p>
        </div>`;
    document.querySelector(
      ".quizz"
    ).style.background.url = `${resposta.data[i].image}`;
  }
}

listarTodosQuizzes();

function criarQuizz() {
  document.querySelector(".tela1").classList.add("esconder");
  document.querySelector(".tela3-1").classList.remove("esconder");
}

//Tela 2 JS

function abrirQuizz(id) {
  quizz = objetosAPI.find((objeto) => objeto.id === Number(id));
  console.log(quizz);
  document.querySelector(".tela1").classList.add("esconder");
  document.querySelector(".tela2").classList.remove("esconder");
  renderizarTela2();
  scrollTop();
}

function renderizarTela2() {
  let paginaQuizz = document.querySelector(".pagina-quizz");
  paginaQuizz.innerHTML = "";
  paginaQuizz.innerHTML = `
    <div class="imagem-superior">
      <img src=${quizz.image} />
      <h1>${quizz.title}</h1>
    </div>
  `;
  for (let i = 0; i < quizz.questions.length; i++) {
    paginaQuizz.innerHTML += `
      <div class="quizz-box box${i + 1}">
        <h2 style="background-color:${quizz.questions[i].color};">${
      quizz.questions[i].title
    }</h2>
      <div class="imagensQuizz pergunta${i + 1}"></div>
      </div>
    `;
    let listaEmbaralhar = quizz.questions[i].answers;
    listaEmbaralhar.sort(random);

    for (let j = 0; j < quizz.questions[i].answers.length; j++) {
      k = i + 2;
      imagensQuizz = document.querySelector(
        `.quizz-box:nth-child(${k}) > .imagensQuizz`
      );
      imagensQuizz.innerHTML += `
         <figure onclick="escolherResposta(this)">
           <img src=${listaEmbaralhar[j].image} />
           <div class="answer esconder">${listaEmbaralhar[j].isCorrectAnswer}</div>
           <figcaption class="resposta-certa">${listaEmbaralhar[j].text}</figcaption>
         </figure>
      `;
    }
  }
}

function random() {
  return Math.random() - 0.5;
}

function escolherResposta(el) {
  const parent = el.parentNode;
  for (let i = 0; i < parent.children.length; i++) {
    parent.children[i].classList.add("naoSelecionado");
    parent.children[i].removeAttribute("onclick");
    console.log(
      parent.querySelector(`figure:nth-child(${i + 1}) > div`).innerHTML
    );
    const ehCorreto = parent.querySelector(
      `figure:nth-child(${i + 1}) > div`
    ).innerHTML;
    if (ehCorreto == "true") {
      parent.children[i].classList.add("resposta-certa");
    } else {
      parent.children[i].classList.add("resposta-errada");
    }
  }
  el.classList.remove("naoSelecionado");
  el.classList.add("selecionado");
  scrollNext();
}

function scrollTop() {
  window.scrollTo(0, 0);
}

function scrollNext() {
  num++;
  const nextElement = document.querySelector(".box" + num).nextElementSibling;
  setTimeout(function () {
    nextElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 2000);
}

//Tela 3.1 JS

function validarInformaçõesQuizz() {
  tituloQuizz = document.querySelector(".tituloQuizz").value;
  quantidadePerguntas = Number(
    document.querySelector(".QuantidadePerguntas").value
  );
  quantidadeNiveis = Number(document.querySelector(".QuantidadeNíveis").value);
  url = document
    .querySelector(".infos-quizz")
    .querySelector(".URLImagem").value;

  var pattern = /^https:\/\//i;
  if (pattern.test(url)) {
    return true;
  } else {
    alert("Preencha os dados corretamente");
    return false;
  }
}

function getInfoQuizz() {
  console.log(tituloQuizz);
  console.log(quantidadePerguntas);
  console.log(quantidadeNiveis);
  console.log(url);
}

//Tela 3.2 JS

function prosseguir() {
  if (validarInformaçõesQuizz()) {
    getInfoQuizz();
    gerarQuantidadePerguntas();
    document.querySelector(".container.tela3-1").classList.add("esconder");
    document.querySelector(".container.tela3-2").classList.remove("esconder");
  }
}

function gerarQuantidadePerguntas() {
  let containerPerguntas = document.querySelector(".perguntas");
  containerPerguntas.innerHTML += `<div class="Pergunta1 aberta">
        <h4 class="num1">Pergunta 1</h4>
        <div class="Pergunta">
          <input minlength="20" maxlength="65" type="text" class="tituloPergunta" placeholder="Texto da pergunta">
          <input type="text" class="URLImagem" placeholder="Cor de fundo da pergunta">
        </div>
     
        <h4>Resposta correta</h4>
        <div class="Resposta-Correta">
          <input type="text" class="RespostaCorreta" placeholder="Resposta correta">
        <input type="text" class="URLImagemCorreta" placeholder="URL da imagem">
        </div>
        
        <h4>Respostas Incorretas</h4>
        <div class="Resposta-Incorreta">
  
          <input type="text" class="RespostaIncorreta" placeholder="Resposta incorreta 1">
          <input type="text" class="URLImagemInCorreta" placeholder="URL da imagem 1">
        </div>
       
        <div class="Resposta-Incorreta">
          <input type="text" class="RespostaIncorreta" placeholder="Resposta incorreta 2">
          <input type="text" class="URLImagemInCorreta" placeholder="URL da imagem 2">
        </div>
       
        <div class="Resposta-Incorreta">
          <input type="text" class="RespostaIncorreta" placeholder="Resposta incorreta 3">
        <input type="text" class="URLImagemInCorreta" placeholder="URL da imagem 3">
        </div>
      </div>`;

  for (let i = 1 + 1; i <= quantidadePerguntas; i++) {
    numPergunta = i;
    containerPerguntas.innerHTML += `<div class="pergunta-element fechada">
        <h4 class="numPergunta">Pergunta${i}</h4> 
        <ion-icon name="open-outline" onclick="abrirPergunta(this)"></ion-icon> 
      </div> `;
  }
}

function abrirPergunta(pergunta) {
  pergunta.parentNode.classList.add("crescer");
  pergunta.classList.add("esconder");
  pergunta.classList.remove("pergunta-element");
  pergunta.parentNode.innerHTML += `
        <div class="Pergunta1">
        <div class="Pergunta">
          <input minlength="20" maxlength="65" type="text" class="tituloPergunta" placeholder="Texto da pergunta">
          <input type="text" class="URLImagem" placeholder="Cor de fundo da pergunta">
        </div>
     
        <h4>Resposta correta</h4>
        <div class="Resposta-Correta">
          <input type="text" class="RespostaCorreta" placeholder="Resposta correta">
        <input type="text" class="URLImagemCorreta" placeholder="URL da imagem">
        </div>
        
        <h4>Respostas Incorretas</h4>
        <div class="Resposta-Incorreta">
  
          <input type="text" class="RespostaIncorreta" placeholder="Resposta incorreta 1">
          <input type="text" class="URLImagemInCorreta" placeholder="URL da imagem 1">
        </div>
       
        <div class="Resposta-Incorreta">
          <input type="text" class="RespostaIncorreta" placeholder="Resposta incorreta 2">
          <input type="text" class="URLImagemInCorreta" placeholder="URL da imagem 2">
        </div>
       
        <div class="Resposta-Incorreta">
          <input type="text" class="RespostaIncorreta" placeholder="Resposta incorreta 3">
        <input type="text" class="URLImagemInCorreta" placeholder="URL da imagem 3">
        </div>
      </div>`;
}
