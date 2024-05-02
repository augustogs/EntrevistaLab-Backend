import express from 'express';
import gerarPerguntas from '../controllers/perguntasController.js';

const router = express.Router();

router.post('/perguntas', gerarPerguntas);

export default router;