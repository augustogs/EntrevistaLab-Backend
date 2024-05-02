import express from 'express';
import cors from 'cors';

const app = express();

import perguntasRoute from './src/routes/perguntasRoute.js';
import feedbackRoute from './src/routes/feedbackRoute.js';

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});

// Use a rota gerarPerguntasRoute para a rota '/gerar-perguntas'
app.use('/perguntas', perguntasRoute);
app.use('/feedback', feedbackRoute);

app.post('/perguntas', perguntasRoute);
app.post('/feedback', feedbackRoute);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor está ouvindo na porta ${PORT}`);
});
