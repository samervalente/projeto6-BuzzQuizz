 let quantidadePerguntas;
 let quantidadeNiveis;
 let url;
 let tituloQuizz;



function listarTodosQuizzes(){
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes')
    promise.then(renderizarTodosQuizzes)
}

function renderizarTodosQuizzes(resposta){
    let todosQuizzes = document.querySelector(".quizzes")
    for(let i =0; i < resposta.data.length; i++){
        todosQuizzes.innerHTML +=  `<div class="quizz" onclick="abrirQuizz()">
        <img src="${resposta.data[i].image}">
        <p class="titulo-quizz">${resposta.data[i].title}</p>
        </div>`
        document.querySelector(".quizz").style.background.url  = `${resposta.data[i].image}`
    }
}

listarTodosQuizzes()

function criarQuizz(){
    document.querySelector(".tela1").classList.add("esconder")
    document.querySelector(".tela3-1").classList.remove("esconder")
}

function prosseguir(){
    if(validarInformaçõesQuizz()){
        document.querySelector(".container.tela3-1").classList.add("esconder")
    }
}

function validarInformaçõesQuizz(){
    quantidadePerguntas = Number(document.querySelector(".QuantidadePerguntas").value)
    quantidadeNiveis = Number(document.querySelector(".QuantidadeNíveis").value)
    url = document.querySelector(".infos-quizz").querySelector(".URLImagem").value
    var pattern = /^https:\/\//i;
    if(pattern.test(url)){
        return true
    }else{
        alert("Preencha os dados corretamente")
        return false
    }

}





