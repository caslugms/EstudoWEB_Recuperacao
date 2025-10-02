const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'db.json');

/**
 * Lê o conteúdo do arquivo JSON do "banco de dados".
 * @returns {object} O objeto do banco de dados (ex: { users: [] }).
 */
const readDB = () => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // Se o arquivo não existir ou for inválido, retorna uma estrutura básica.
        console.error("Erro ao ler db.json. Criando estrutura básica...");
        return { users: [] };
    }
};

/**
 * Escreve o objeto no arquivo JSON.
 * @param {object} data O objeto a ser escrito no db.json.
 */
const writeDB = (data) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error("Erro ao escrever no db.json:", error);
    }
};

module.exports = {
    readDB,
    writeDB
};