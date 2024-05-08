// loginController.js
import bcrypt from 'bcrypt';
import db from '../../database.js';

export const loginUsuario = async (req, res) => {
    const { username, password } = req.body;

    // Busca o usuário no banco de dados
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao autenticar usuário');
        }

        if (!row) {
            res.status(401).send('Usuário não encontrado');
        } else {
            // Compara a senha hash do banco de dados com a senha fornecida
            const isPasswordValid = await bcrypt.compare(password, row.password);
            if (isPasswordValid) {
                res.status(200).send('Usuário autenticado com sucesso');
            } else {
                res.status(401).send('Credenciais inválidas');
            }
        }
    });
};
