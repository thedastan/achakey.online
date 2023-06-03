const express = require("express");
const app = express();
const router = require("./router/file.route");

const PORT = 8080;

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Разрешить доступ со всех доменов (здесь '*')
  res.header("Access-Control-Allow-Methods", "GET, DELETE"); // Разрешить методы запросов
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); // Разрешить заголовки
  next();
});

app.use("/api", router);

app.listen(PORT, () => console.log(`Server started on port ... ${PORT}`));
