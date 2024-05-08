import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('database.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`, (err) => {
        if (err) {
            console.error('Erro ao criar a tabela de usuários:', err.message);
        } else {
            console.log('Tabela de usuários criada com sucesso.');
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS entrevistas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        area_atuacao TEXT,
        perguntas TEXT,
        respostas TEXT,
        texto_feedback TEXT,
        data_entrevista TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (usuario_id) REFERENCES users(id)
    )`, (err) => {
        if (err) {
            console.error('Erro ao criar a tabela de entrevistas:', err.message);
        } else {
            console.log('Tabela de entrevistas criada com sucesso.');
        }
    });
});


export default db;
