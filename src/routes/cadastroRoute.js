// registerRoute.js
import express from 'express';
import { cadastraUsuario } from '../controllers/cadastroController.js';

const router = express.Router();

router.post('/cadastro', cadastraUsuario);

export default router;
