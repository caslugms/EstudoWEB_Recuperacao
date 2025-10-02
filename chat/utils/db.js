const fs = require("fs"); // módulo do Node para manipular arquivos
const path = require("path"); // módulo para lidar com caminhos de arquivos

// caminho do arquivo db.json
const dbPath = path.join(__dirname, "..", "db.json");

// função para ler o arquivo JSON
function readDB() {
  const data = fs.readFileSync(dbPath, "utf-8"); // lê o arquivo como texto
  return JSON.parse(data); // transforma o texto em objeto JS
}

// função para escrever no arquivo JSON
function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2)); // transforma objeto em JSON e escreve
}

module.exports = { readDB, writeDB }; // exporta funções para usar em outros arquivos
