import db from '../../database.js';

export const getEntrevistasPorUsuario = (req, res) => {
  const usuarioId = req.params.usuario_id;
  
  const query = 'SELECT * FROM entrevistas WHERE usuario_id = ?';
  
  db.all(query, [usuarioId], (err, entrevistas) => {
    if (err) {
      console.error('Erro ao buscar entrevistas:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      const entrevistasFormatadas = entrevistas.map(entrevista => ({
        id: entrevista.id,
        data: entrevista.data_entrevista,
        area: entrevista.area_atuacao,
        perguntas: JSON.parse(entrevista.perguntas),
        respostas: JSON.parse(entrevista.respostas),
        feedback: JSON.parse(entrevista.texto_feedback)
      }));
      res.json(entrevistasFormatadas);
    }
  });
};