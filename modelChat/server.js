const express = require("express");
const app = express();
const entityRoutes = require("./routes/entity");

app.use(express.json());
app.use("/entity", entityRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
