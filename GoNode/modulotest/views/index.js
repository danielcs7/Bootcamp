const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

//setando os parametros globais
app.set("view engine", "njk");

//aqui eu monto a rota
//http://localhost:3000/duvida/?data=2019-03-16&horario=20:45:52&temp=12.45&humd=45
app.get("/greenhouse/", (req, res) => {
  // console.log(req.query.horario);
  //return res.send("Salvo com sucesso");
  return res.render("list", { dados: "Daniel" });
  //return res.sendStatus("200");

  //return res.json({
  //  message: "ok"
  //});

  // return res.send(
  //   `Bem-vindo ${req.query.data} ${req.query.horario} ${req.query.temp} ${
  //     req.query.humd
  //   }`
  // );
});

app.listen(3000);
