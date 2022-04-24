let quantidadePerguntas;
let quantidadeNiveis;
let url;
let tituloQuizz;
let objetosAPI = [];
let quizz = [];
let inputs = []  

let quizzObject = {
  title: tituloQuizz,
  image:url,
  questions:[]
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

function chamarServidorQuizzes(){
  let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes')
  promise.then(renderizarTodosQuizzes)
}

chamarServidorQuizzes();

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
    for (let j = 0; j < quizz.questions[i].answers.length; j++) {
      k = i + 2;
      imagensQuizz = document.querySelector(
        `.quizz-box:nth-child(${k}) > .imagensQuizz`
      );
      imagensQuizz.innerHTML += `
        <figure>
          <img src=${quizz.questions[i].answers[j].image} />
          <figcaption>${quizz.questions[i].answers[j].text}</figcaption>
        </figure>
      `;
    }
  }
}

function criarQuizz(){
    document.querySelector(".tela1").classList.add("esconder")
    document.querySelector(".tela3-1").classList.remove("esconder")
}

let pattern = /^https:\/\//i;

function validarInformaçõesQuizz(){
  tituloQuizz = document.querySelector(".tituloQuizz").value
  url = document.querySelector(".infos-quizz").querySelector(".URLImagem").value
  quantidadePerguntas = Number(document.querySelector(".QuantidadePerguntas").value)
  quantidadeNiveis = Number(document.querySelector(".QuantidadeNíveis").value)
  return true
}

/*
function validarInformaçõesQuizz(){
    tituloQuizz = document.querySelector(".tituloQuizz").value
    url = document.querySelector(".infos-quizz").querySelector(".URLImagem").value
    quantidadePerguntas = Number(document.querySelector(".QuantidadePerguntas").value)
    quantidadeNiveis = Number(document.querySelector(".QuantidadeNíveis").value)
    
    if(pattern.test(url) && (!isNaN(quantidadePerguntas) && !isNaN(quantidadeNiveis)) && tituloQuizz.length > 20 && tituloQuizz.length < 65 && quantidadePerguntas >=3 && quantidadeNiveis >=2){
        return true
    }else{
      alert("Dados inválidos")
        return false
    }
}

*/
function prosseguir(){
  if(validarInformaçõesQuizz()){
    document.querySelector(".container.tela3-1").classList.add("esconder")
    document.querySelector(".container.tela3-2").classList.remove("esconder")
    gerarQuantidadePerguntas()
  }
  console.log(tituloQuizz, tituloQuizz.length)
}


function gerarQuantidadePerguntas(){
//3. 1, 2 e 3
  let containerPerguntas = document.querySelector(".perguntas")
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
  `

  for(let i = 1+1 ; i <= quantidadePerguntas; i++){
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
 </div>`
  }
}

function abrirPergunta(icone){
  icone.parentNode.classList.remove("fechada")
  icone.remove()
}

  function getInputs()
  {

    quizzObject = {
      title: tituloQuizz,
      image:url,
      questions:[]
    }
    let inputText;
      for(let i = 0; i < quantidadePerguntas; i++)
      {  
        inputText = document.querySelectorAll(".div-pergunta")[i].querySelector(".infos").querySelectorAll("input")
        quizzObject.questions.push
        (
          {
            title: document.querySelectorAll(".div-pergunta")[i].querySelector(".infos").querySelectorAll("input")[0].value,
            color: document.querySelectorAll(".div-pergunta")[i].querySelector(".infos").querySelectorAll("input")[1].value,
            answers: 
            [
              {
                text: document.querySelectorAll(".div-pergunta")[i].querySelector(".infos").querySelectorAll("input")[2].value,
                image: document.querySelectorAll(".div-pergunta")[i].querySelector(".infos").querySelectorAll("input")[3].value,
                isCorrectAnswer: true
              },
              {
                text: document.querySelectorAll(".div-pergunta")[i].querySelector(".infos").querySelectorAll("input")[4].value,
                image: document.querySelectorAll(".div-pergunta")[i].querySelector(".infos").querySelectorAll("input")[5].value,
                isCorrectAnswer: false
              },
              {
                text: document.querySelectorAll(".div-pergunta")[i].querySelector(".infos").querySelectorAll("input")[6].value,
                image: document.querySelectorAll(".div-pergunta")[i].querySelector(".infos").querySelectorAll("input")[7].value,
                isCorrectAnswer: false
              },
              {
                text: document.querySelectorAll(".div-pergunta")[i].querySelector(".infos").querySelectorAll("input")[8].value,
                image: document.querySelectorAll(".div-pergunta")[i].querySelector(".infos").querySelectorAll("input")[9].value,
                isCorrectAnswer: false
              }
            ] 
          },
        )
      if(inputText[0].value.length < 20 || inputText[1].value.length < 6 || !inputText[1].value.startsWith("#") || (inputText[2].value == "" || inputText[4].value == "" || inputText[6].value == "" || inputText[8].value == "")) {
        return false
      }else{
        return true
      }    
      }//final do for 
    }
 
function criarNiveis(){
  if(getInputs () == false){
    alert("Dados inválidos")
  }else{
    document.querySelector(".tela3-2").classList.add("esconder")
    document.querySelector(".tela3-3").classList.remove("esconder")
  }
}