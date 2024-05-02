import fetch from 'node-fetch';
import extrairPerguntas from '../utils/textoUtil.js';
import dotenv from 'dotenv';

dotenv.config(); 

const gerarPerguntas = async (req, res) => {
    const { areaAtuacao } = req.body;

    try {
        const resposta = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Faça 5 perguntas para uma entrevista de emprego de um desenvolvedor júnior para uma vaga de ${areaAtuacao}.`
                    }]
                }]
            })
        });

        if (!resposta.ok) {
            throw new Error('Não foi possível completar a requisição');
        }

        const dadosJson = await resposta.json();
        const textoPerguntas = dadosJson.candidates[0].content.parts[0].text;

        res.json({ perguntas: extrairPerguntas(textoPerguntas) });
    } catch (error) {
        console.error('Erro ao gerar perguntas:', error);
        res.status(500).json({ error: 'Erro ao gerar perguntas' });
    }
};

export default gerarPerguntas;
