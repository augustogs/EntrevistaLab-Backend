const extrairPerguntas = (texto) => {
    const regex = /\d+\.\s+(.*)/g;
    const perguntas = [];
    let match;
    
    while ((match = regex.exec(texto)) !== null) {
        const perguntaSemAsteriscos = match[1].replace(/\*/g, '').trim();
        perguntas.push(perguntaSemAsteriscos);
    }
    return perguntas;
};

export default extrairPerguntas;