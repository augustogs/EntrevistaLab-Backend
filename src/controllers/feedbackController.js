import fetch from 'node-fetch';

import feedbackUtil from '../utils/feedbackUtil.js';

import dotenv from 'dotenv';

import db from '../../database.js';

dotenv.config(); 

const gerarFeedback = async (req, res) => {
    const { usuario, areaAtuacao, perguntas, respostas } = req.body;
    
    const texto = feedbackUtil.juntarPerguntasERespostas(perguntas, respostas);

    try {
        const resposta = await fetch(`${process.env.API_URL}${process.env.API_KEY}`, {
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

        const dataEntrevista = new Date().toISOString();
        const query = 'INSERT INTO entrevistas (usuario_id, area_atuacao, perguntas, respostas, texto_feedback, data_entrevista) VALUES (?, ?, ?, ?, ?, ?)';
        const params = [usuario, JSON.stringify(areaAtuacao), JSON.stringify(perguntas), JSON.stringify(respostas), JSON.stringify(textoProcessado), dataEntrevista];
        
        console.log(areaAtuacao);
        db.run(query, params, function(err) {
            if (err) {
                console.error('Erro ao inserir entrevista:', err.message);
            } else {
                console.log('Entrevista inserida com sucesso.');
            }
        });
        
        res.json({ textoFeedback: textoProcessado });

    } catch (error) {
        console.error('Erro ao enviar os dados para a API:', error.message);
        res.status(500).json({ error: 'Erro ao enviar os dados para a API' });
    }
};

export default gerarFeedback;
