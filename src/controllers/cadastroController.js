// registerController.js
import bcrypt from 'bcrypt';
import db from '../../database.js';

export const cadastraUsuario = async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);

    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao registrar usuário');
        }

        if (row) {
            res.status(400).send('Nome de usuário já existe');
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            
            db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Erro ao registrar usuário');
                } else {
                    res.status(201).send('Usuário registrado com sucesso');
                }
            });
        }
    });
};
