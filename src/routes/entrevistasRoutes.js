import express from 'express';
import { getEntrevistasPorUsuario } from '../controllers/entrevistasController.js';

const router = express.Router();

router.get('/entrevistas/:usuario_id', getEntrevistasPorUsuario);

export default router;
