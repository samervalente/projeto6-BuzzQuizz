


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