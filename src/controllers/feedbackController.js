import fetch from 'node-fetch';

import feedbackUtil from '../utils/feedbackUtil.js';

import dotenv from 'dotenv';

dotenv.config(); 

const gerarFeedback = async (req, res) => {
    const { perguntas, respostas } = req.body;
    
    const texto = feedbackUtil.juntarPerguntasERespostas(perguntas, respostas);

    try {
        const resposta = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Dado cada reposta fornecida para cada pergunta, me dê um feedback das respostas, indicando formas de melhoias ${texto}`
                    }]
                }]
            })
        });

        if (!resposta.ok) {
            throw new Error('Não foi possível enviar os dados para a API');
        }

        const dadosJson = await resposta.json();
        const textoFeedbackGerado = dadosJson.candidates[0].content.parts[0].text;
        
        const feedbacks = feedbackUtil.removeAsterisks(textoFeedbackGerado);
        const textoProcessado = feedbackUtil.processarTexto(feedbacks);
        
        res.json({ textoFeedback: textoProcessado });

    } catch (error) {
        console.error('Erro ao enviar os dados para a API:', error.message);
        res.status(500).json({ error: 'Erro ao enviar os dados para a API' });
    }
};

export default gerarFeedback;
