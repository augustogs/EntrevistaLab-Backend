import express from 'express';
import cors from 'cors';

const app = express();

import cadastroRoute from './src/routes/cadastroRoute.js';
import loginRoute from './src/routes/loginRoute.js';
import perguntasRoute from './src/routes/perguntasRoute.js';
import feedbackRoute from './src/routes/feedbackRoute.js';
import entrevistasRoute from './src/routes/entrevistasRoutes.js';

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

// Rotas para registro e login de usuários
app.post('/cadastro', cadastroRoute);
app.post('/login', loginRoute);

app.use('/entrevistas/:usuario_id', entrevistasRoute);
app.get('/entrevistas/:usuario_id', entrevistasRoute);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor está ouvindo na porta ${PORT}`);
});
