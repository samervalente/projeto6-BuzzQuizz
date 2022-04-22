let quantidadePerguntas;
let quantidadeNiveis;
let url;
let tituloQuizz;
let objetosAPI = [];
let quizz = [];

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

function prosseguir() {
  if (validarInformaçõesQuizz()) {
    document.querySelector(".container.tela3-1").classList.add("esconder");
  }
}

function validarInformaçõesQuizz() {
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

function abrirQuizz(id) {
  quizz = objetosAPI.find((objeto) => objeto.id === Number(id));
  console.log(quizz);
  document.querySelector(".tela1").classList.add("esconder");
  document.querySelector(".tela2").classList.remove("esconder");
  renderizarTela2();
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
      <div class="quizz-box">
        <h2 style="background-color:${quizz.questions[i].color} ;">${quizz.questions[i].title}</h2>
      <div class="imagensQuizz"></div>
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
         <figure>
           <img src=${listaEmbaralhar[j].image} />
           <figcaption>${listaEmbaralhar[j].text}</figcaption>
         </figure>
      `;
    }
  }
}

function random() {
  return Math.random() - 0.5;
}

function obterObjetos() {}
