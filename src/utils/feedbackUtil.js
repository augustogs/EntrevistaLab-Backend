function removeAsterisks(feedbackText) {
    feedbackText = feedbackText.replace(/\*\*/g, '');
    feedbackText = feedbackText.replace(/\* /g, '');

    return feedbackText;
}

function juntarPerguntasERespostas(perguntas, respostas) {
    if (perguntas.length !== respostas.length) {
        return "Erro: o número de perguntas e respostas não corresponde.";
    }

    let texto = "";

    for (let i = 0; i < perguntas.length; i++) {
        texto += `Pergunta ${i + 1}: ${perguntas[i]}\n`;
        texto += `Resposta:${i + 1}:  ${respostas[i]}\n\n`;
    }
    return texto;
}

function processarTexto(texto) {
    const partes = texto.split(/(Pergunta|Resposta|Feedback da) [0-9]:/);

    let partesFiltradas = partes.filter(part => part.trim() !== '');
    partesFiltradas = partesFiltradas.filter(part => part.length >= 40);
    partesFiltradas = partesFiltradas.map(part => part.replace("Feedback da", "").trim());

    return partesFiltradas;
}

export default {
    removeAsterisks,
    juntarPerguntasERespostas,
    processarTexto
};
