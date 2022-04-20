


function listarTodosQuizzes(){
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes')
    promise.then(renderizarTodosQuizzes)
}

function renderizarTodosQuizzes(resposta){
    let todosQuizzes = document.querySelector(".quizzes")
    for(let i =0; i < resposta.data.length; i++){
        todosQuizzes.innerHTML +=  `<div class="quizz" onclick="responderQuizz()">
        <img src="${resposta.data[i].image}">
        <p class="titulo-quizz">${resposta.data[i].title}</p>
        </div>`
        document.querySelector(".quizz").style.background.url  = `${resposta.data[i].image}`
    }
}

listarTodosQuizzes()

function criarQuizz(elemento){
    document.querySelector(".tela1").classList.add("hidden")
    document.querySelector(".tela3").classList.remove("hidden")
}


function prosseguir(){
    verificaURL()
}


prosseguir()


function verificaURL() {
    let url = document.getElementById('URLQuizz').value;
    var pattern = /^https:\/\//i;

    // Check if pattern is there in the string 
    // or not with .test() method
    if (pattern.test(url)) {
        alert("OK")
    }
    else {
        alert("URL INVÁLIDA")
    }
}