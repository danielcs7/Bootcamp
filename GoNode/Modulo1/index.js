/*
// const => nunca terá o seu valor alterado
// require => seria o import
const http = require("http");
//criando um servidor simples
//listen é uma função onde declaramos qual a porta o servidor
//sera conectado
http
  .createServer((req, res) => {
    console.log(req);

    return res.end("Hello Arduino...")
  })
  .listen(3000);
*/
// Agora que importou o express poderiamos criar o
// servidor com express

/* //aqui é o segundo exemplo deles
const express = require("express");
const app = express();

const logMiddleware = (req, res, next) => {
  console.log(
    `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
  );
  req.appName = "GoNode";

  return next();
};

//se eu quiser que todas as rotas utilizem o middleware
app.use(logMiddleware);
//criando rotas
//se eu nao quiser nenhuma rota é so deixar '/'
app.get("/", logMiddleware, (req, res) => {
  //devolve uma resposta
  return res.send(`Bem-vindo ao ${req.appName}, ${req.query.name}`);
});

app.get("/login", (req, res) => {
  return res.send(`Bem vindo ao ${req.appName}, ${req.query.name}`);
});

app.get("/nome/:name", logMiddleware, (req, res) => {
  return res.send(`Bem-vindo ${req.params.name}`);
});

//Duvida Arduino Get
//api/tempmeasures/getsave/1/2017-11-10/20:45:52/12.45/932.12
// /duvida/?data=2019-03-16&?horario=20:45:52&?temp=12.45&?humd=45

//http://localhost:3000/duvida/?data=2019-03-16&horario=20:45:52&temp=12.45&humd=45
app.get("/duvida/", (req, res) => {
  console.log(req.query.data);
  return res.send(
    `Bem-vindo ${req.query.data} ${req.query.horario} ${req.query.temp} ${
      req.query.humd
    }`
  );
});

app.listen(3000);

*/

const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

// isso aqui é preciso para que o express
// saiba lidar com formulario
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

const users = ['Daniel Carlos', 'Samira Santos', 'Sofia Santos']

app.get('/', (req, res) => {
  // devolve uma resposta
  // return res.send(`Bem-vindo ao ${req.appName}, ${req.query.name}`);
  return res.render('list', { users })
})

app.get('/new', (req, res) => {
  return res.render('new')
})

app.post('/create', (req, res) => {
  console.log(req.body)

  // push serve para adicionar dados em um array
  users.push(req.body.user)
  // aqui redireciono de volta para a listagem
  // ja com a nova informação adicionada
  return res.redirect('/')
  // return res.send("ok");
})

app.listen(3000)
