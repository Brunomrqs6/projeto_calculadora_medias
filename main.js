const form = document.getElementById('form-atividade'); //criando variavel pro formulário
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando"'
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji triste"'
const atividades =[];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>'
const notaMinima = parseFloat(prompt("Digite a nota mínima: "));

let linhas = '';

form.addEventListener('submit', function(e) { //prevenindo que o navegador resete após enviar
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();

});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');//variaveis pras notas e nomes
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if(atividades.includes(inputNomeAtividade.value)){
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida`)
    }
    else {

        atividades.push(parseFloat(inputNomeAtividade.value));
        notas.push(parseFloat(inputNotaAtividade.value));

        let linha = '<tr>'; //criamos uma variavel pra tabela que irá receber os nomes e notas do alunos
        linha += `<td>${inputNomeAtividade.value}</td>`
        linha += `<td>${inputNotaAtividade.value}</td>`
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`//ternário, ? é true, : é false
        linha += '</tr>'

        linhas += linha;
    }

    inputNomeAtividade.value='';//resetar o formulario depois de enviado
    inputNotaAtividade.value='';
}

function atualizaTabela (){ 
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;

}

function calculaMediaFinal (){
    let somaDasNotas = 0 ;

    for(let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }
    return somaDasNotas / notas.length;
}