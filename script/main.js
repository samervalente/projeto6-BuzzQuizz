let quantidadePerguntas;
let quantidadeNiveis;
let url;
let tituloQuizz;
let objetosAPI = [];
let quizz = [];
let inputs = [];

let quizzObject = {
  title: tituloQuizz,
  image: url,
  questions: [],
  levels: [],
};

let numPergunta;
let finalQuizz;
let pontuacao;
let tituloResultado;
let textoResultado;
let imagemResultado;
let contador;
num = 0;
let quizzUsuario = [];

let ids = [];
let quizzesUsuario = [];
let lastQuizz = [];
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

function chamarServidorQuizzes() {
  let promise = axios.get(
    "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes"
  );
  promise.then(renderizarTodosQuizzes);
}

chamarServidorQuizzes();

//Tela2 JS
function abrirQuizz(id) {
  quizz = objetosAPI.find((objeto) => objeto.id === Number(id));
 
  document.querySelector(".tela1").classList.add("esconder");
  document.querySelector(".tela3-4").classList.add("esconder");
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
    contador = i + 1;
    paginaQuizz.innerHTML += `
      <div class="quizz-box box${contador}">
        <h2 style="background-color:${quizz.questions[i].color};">${quizz.questions[i].title}</h2>
      <div class="imagensQuizz pergunta${contador}"></div>
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

function respostasCertas() {
  const acertos = document.querySelectorAll(
    ".resposta-certa.selecionado"
  ).length;
  const erros = document.querySelectorAll(
    ".resposta-errada.selecionado"
  ).length;
  pontuacao = Math.round((acertos / (acertos + erros)) * 100);
}

function renderizarResposta() {
  finalQuizz = document.querySelector(".final-quizz");
  const numeroSelecionados = document.querySelectorAll(".selecionado").length;

  const numeroBox = document.querySelectorAll(".quizz-box").length;

  if (numeroSelecionados === numeroBox) {
    respostasCertas();
    for (let i = 0; i < quizz.levels.length; i++) {
      if (pontuacao >= Number(quizz.levels[i].minValue)) {
        tituloResultado = quizz.levels[i].title;
        textoResultado = quizz.levels[i].text;
        imagemResultado = quizz.levels[i].image;
      }
    }
    finalQuizz.innerHTML = `
          <div class="resultados">
            <div class="quizz-box box${contador + 1}">
              <h2>${pontuacao}% de acerto: ${tituloResultado}</h2>
              <div class="imagemResultado">
                <img src="${imagemResultado}" />
                <h2>${textoResultado}</h2>
              </div>
            </div>
          </div>
          <button class="reiniciar" onclick="reiniciar()">
            Reiniciar Quizz
          </button>
          <button class="voltar" onclick="voltar()">Voltar para home</button>
        </div>
    `;
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
  renderizarResposta();
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
  if (nextElement === null) {
    setTimeout(function () {
      respostaFinal = document.querySelector(".resultados > .quizz-box");
      respostaFinal.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 2000);
  }
}

function reiniciar() {
  scrollTop();
  renderizarTela2();
  num = 0;
  finalQuizz.innerHTML = "";
}

function voltar() {
  document.querySelector(".tela2").classList.add("esconder");
  document.querySelector(".tela1").classList.remove("esconder");
  scrollTop();
  num = 0;
  finalQuizz.innerHTML = "";
}

//INÍCIO DA TELA 3 ( CRIAR QUIZZES)
function criarQuizz() {
  document.querySelector(".tela1").classList.add("esconder");
  document.querySelector(".tela3-1").classList.remove("esconder");
}

//TELA 3.1 (INFORMAÇÕES BÁSICAS DO QUIZZ)
let pattern = /^https:\/\//i;


function validarInformaçõesQuizz(){
  tituloQuizz = document.querySelector(".tituloQuizz").value
  url = document.querySelector(".infos-quizz").querySelector(".URLImagem").value
  quantidadePerguntas = Number(document.querySelector(".QuantidadePerguntas").value)
  quantidadeNiveis = Number(document.querySelector(".QuantidadeNíveis").value)
  
  if(pattern.test(url) && (!isNaN(quantidadePerguntas) && !isNaN(quantidadeNiveis)) && tituloQuizz.length > 20 && tituloQuizz.length < 65 && quantidadePerguntas >=3 && quantidadeNiveis >=2){
      return true
  }else{
      return false
  }
}


function prosseguir() {
  if(validarInformaçõesQuizz()){
    console.log(quizzObject)
    document.querySelector(".container.tela3-1").classList.add("esconder");
    document.querySelector(".container.tela3-2").classList.remove("esconder");
    gerarQuantidadePerguntas();
  }else{
    alert("Dados Inválidos")
  }
}

//TELA 3.2 (CRIAR AS PERGUNTAS)
function gerarQuantidadePerguntas() {
  //3. 1, 2 e 3
  let containerPerguntas = document.querySelector(".perguntas");
  containerPerguntas.innerHTML += `
  <div class="div-pergunta">
    <h4 class="numPergunta">Pergunta 1</h4>
    <div class="infos">
      <div class="input">
        <input type="text" placeholder="Texto da pergunta">
        <input type="text" placeholder="Cor de fundo da pergunta" name="" id="">
      </div>
      <div class="input">
       <h4>Resposta Correta</h4>
       <input type="text" placeholder="Resposta correta">
       <input type="text" placeholder="URL da imagem" name="" id="">
     </div>
     <div class="input">
       <h4>Respostas Incorretas</h4>
       <div class="div-input">
         <input type="text" placeholder="Resposta incorreta 1">
         <input type="text" placeholder="URL da imagem 1" name="" id="">
       </div>

       <div class="div-input">
         <input type="text" placeholder="Resposta incorreta 2">
         <input type="text" placeholder="URL da imagem 2" name="" id="">
       </div>

       <div class="div-input">
         <input type="text" placeholder="Resposta incorreta 3">
         <input type="text" placeholder="URL da imagem 3" name="" id="">
       </div>
     </div>
    </div>   
  `;

  for (let i = 1 + 1; i <= quantidadePerguntas; i++) {
    containerPerguntas.innerHTML += `   <div class="div-pergunta fechada">
    <h4 class="numPergunta">Pergunta ${i}</h4>
    <ion-icon name="open-outline" onclick="abrirPergunta(this)"></ion-icon>

    <div class="infos">
      <div class="input">
        <input type="text" placeholder="Texto da pergunta">
        <input type="text" placeholder="Cor de fundo da pergunta" name="" id="">
      </div>
      <div class="input">
       <h4>Resposta Correta</h4>
       <input type="text" placeholder="Resposta correta">
       <input type="text" placeholder="URL da imagem" name="" id="">
     </div>
     <div class="input">
       <h4>Respostas Incorretas</h4>
       <div class="div-input">
       <input type="text" placeholder="Resposta incorreta 1">
       <input type="text" placeholder="URL da imagem 1" name="" id="">
       </div>

       <div class="div-input">
       <input type="text" placeholder="Resposta incorreta 2">
       <input type="text" placeholder="URL da imagem 2" name="" id="">
       </div>

       <div class="div-input">
       <input type="text" placeholder="Resposta incorreta 3">
       <input type="text" placeholder="URL da imagem 3" name="" id="">
       </div>
     </div>
    </div> 
 </div>`;
  }
}

function abrirPergunta(icone) {
  icone.parentNode.classList.remove("fechada");
  icone.remove();
}

function getInputs() {
  quizzObject.questions = [];
  let inputText;
  for (let i = 0; i < quantidadePerguntas; i++) {
    inputText = document
      .querySelectorAll(".div-pergunta")
      [i].querySelector(".infos")
      .querySelectorAll("input")

    quizzObject.questions.push(
      {
      title: document
        .querySelectorAll(".div-pergunta")
        [i].querySelector(".infos")
        .querySelectorAll("input")[0].value,
      color: document
        .querySelectorAll(".div-pergunta")
        [i].querySelector(".infos")
        .querySelectorAll("input")[1].value,
      answers: [
        {
          text: document
            .querySelectorAll(".div-pergunta")
            [i].querySelector(".infos")
            .querySelectorAll("input")[2].value,
          image: document
            .querySelectorAll(".div-pergunta")
            [i].querySelector(".infos")
            .querySelectorAll("input")[3].value,
          isCorrectAnswer: true,
        },
        {
          text: document
            .querySelectorAll(".div-pergunta")
            [i].querySelector(".infos")
            .querySelectorAll("input")[4].value,
          image: document
            .querySelectorAll(".div-pergunta")
            [i].querySelector(".infos")
            .querySelectorAll("input")[5].value,
          isCorrectAnswer: false,
        },
        {
          text: document
            .querySelectorAll(".div-pergunta")
            [i].querySelector(".infos")
            .querySelectorAll("input")[6].value,
          image: document
            .querySelectorAll(".div-pergunta")
            [i].querySelector(".infos")
            .querySelectorAll("input")[7].value,
          isCorrectAnswer: false,
        },
        {
          text: document
            .querySelectorAll(".div-pergunta")
            [i].querySelector(".infos")
            .querySelectorAll("input")[8].value,
          image: document
            .querySelectorAll(".div-pergunta")
            [i].querySelector(".infos")
            .querySelectorAll("input")[9].value,
          isCorrectAnswer: false,
        },
      ],
    });
  } //final do for
  for(let i = 0 ; i < quantidadePerguntas; i++){
    if(inputText[0].value.length < 20 || inputText[1].value.length < 6 || !inputText[1].value.startsWith("#") || inputText[2].value === "" ||inputText[4].value === "" || inputText[6].value === "" || inputText[8].value === "") {
      return false
    }else{
      return true
    } 
  }
}

function criarNiveis() {

  
  
  if(  getInputs())
  {console.log(quizzObject)
    console.log(quantidadePerguntas)
    document.querySelector(".tela3-2").classList.add("esconder");
    document.querySelector(".tela3-3").classList.remove("esconder");
    renderizarNiveis();
  }else{
    alert("Dados inválidos")
  }
  
}

//TELA 3.3 - CRIAR NÍVEIS
function abrirNivel(icone) {
  icone.parentNode.classList.remove("fechada");
  icone.remove();
}

function renderizarNiveis() {
  let divNivel = document.querySelector(".niveis");
  divNivel.innerHTML += `<div class="div-nivel">
      <h4>Nível 1</h4>
      <div class="inputs">
        <input placeholder="Título do nível" type="text" class="tituloNivel">
        <input placeholder="% de acerto mínima" type="text" class="porcentagemAcerto">
        <input placeholder="URL da imagem do nível" type="text" class="URLImagem">
        <input placeholder="Descrição do nível" type="text">
      </div> 
    </div>`;
  for (let i = 1 + 1; i <= quantidadeNiveis; i++) {
    divNivel.innerHTML += `<div class="div-nivel fechada">
    <h4>Nível ${i}</h4>
    <ion-icon name="open-outline" onclick="abrirNivel(this)"></ion-icon>
    <div class="inputs">
      <input placeholder="Título do nível" type="text" class="tituloNivel">
      <input placeholder="% de acerto mínima" type="text" class="porcentagemAcerto">
      <input placeholder="URL da imagem do nível" type="text" class="URLImagem">
      <input placeholder="Descrição do nível" type="text">
    </div>
  </div>`;
  }
}

function getNiveis() {
  let inputText
  for (let i = 0; i < quantidadeNiveis; i++) {
     inputText = document.querySelectorAll(".div-nivel")[i].querySelector(".inputs").querySelectorAll("input")
    quizzObject.title = tituloQuizz;
    quizzObject.image = url;

    quizzObject.levels.push({
      title: document
        .querySelectorAll(".div-nivel")
        [i].querySelector(".inputs")
        .querySelectorAll("input")[0].value,
      image: document
        .querySelectorAll(".div-nivel")
        [i].querySelector(".inputs")
        .querySelectorAll("input")[2].value,
      text: document
        .querySelectorAll(".div-nivel")
        [i].querySelector(".inputs")
        .querySelectorAll("input")[3].value,
      minValue: Number(
        document
          .querySelectorAll(".div-nivel")
          [i].querySelector(".inputs")
          .querySelectorAll("input")[1].value
      ),
    });
  }

  for(let i = 0 ; i < quantidadeNiveis; i++){
    if(inputText[0].value < 10 || Number(inputText[1].value) < 0 || Number(inputText[1].value) > 100 || inputText[3].value < 30){
      return false
    }else{
      return true
    }
  }

}

function finalizarQuizz() {
  if(getNiveis()){
    console.log(quizzObject)
    document.querySelector(".tela3-3").classList.add("esconder");
    document.querySelector(".tela3-4").classList.remove("esconder");
    let promise = axios.post(
      "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes",
      quizzObject
    );
    promise.then(getNew);
  }else{
    alert("Dados Inválidos")
  }
}

function getNew() {
  axios
    .get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes")
    .then(getLastQuizz);
  axios
    .get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes")
    .then(obterDeNovo);
}

function obterDeNovo(resposta) {
  objetosAPI = resposta.data;
 
}

function getLastQuizz(response) {
  lastQuizz.push(response.data[0]);
  const lastQuizzSerializado = JSON.stringify(lastQuizz);
  localStorage.setItem("quizzUsuario", lastQuizzSerializado);
  renderizarTelaFinal();
  getQuizzUsuario();
}

const divUsuario = document.querySelector(".tela1 .filled .quizz-usuario");

function getQuizzUsuario() {
  const quizzesUsuarioSerializado = localStorage.getItem("quizzUsuario");
  quizzUsuario = JSON.parse(quizzesUsuarioSerializado);
  if (quizzUsuario.length != 0) {
    document.querySelector(".quizzes-usuario").classList.add("esconder");
    document.querySelector(".filled").classList.remove("esconder");
    divUsuario.innerHTML = "";
    renderizarQuizzUsuario();
  }
}

function renderizarQuizzUsuario() {
  for (let i = 0; i < quizzUsuario.length; i++) {
    divUsuario.innerHTML += `<div class="quizz" onclick="abrirQuizz('${quizzUsuario[i].id}')">
    <img src="${quizzUsuario[i].image}">
    <p class="titulo-quizz">${quizzUsuario[i].title}</p>
    </div>`;
  }
}

function renderizarTelaFinal() {
  // document.querySelector(".tela3-3").classList.add("esconder");
  // document.querySelector(".tela3-4").classList.remove("esconder");
  let divRender = document.querySelector(".tela3-4");

  divRender.innerHTML = "";
  divRender.innerHTML = `
  <h4>Seu quizz está pronto!</h4>
  <div class="quizz" onclick="abrirQuizz('${lastQuizz.at(-1).id}')">
    <img src="${lastQuizz.at(-1).image}">
    <p class="titulo-quizz">${lastQuizz.at(-1).title}</p>
  </div>
  <button onclick="abrirQuizz('${lastQuizz.at(-1).id}')">Acessar Quizz</button>
  <p  onclick="voltarHome()">Voltar pra home</p>`;
}


function voltarHome() {
  document.querySelector(".tela3-4").classList.add("esconder");
  document.querySelector(".tela1").classList.remove("esconder");
}

console.log(quizzObject)