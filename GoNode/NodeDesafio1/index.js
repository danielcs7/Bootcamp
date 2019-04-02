/*
Desafio 1
Configure uma aplicação utilizando
ExpressJS, ok
Nunjucks, ok
EditorConfig ok
e ESLint.  ok0

Rotas
/ : Rota inicial que renderiza uma página com um formulário com um
único campo age que representa a idade do usuário;
/check : Rota chamada pelo formulário da página inicial via método
POST que checa se a idade do usuário é maior que 18 e o redireciona
para a rota /major , caso contrário o redireciona para a
rota /minor (Lembre de enviar a idade como Query Param no
redirecionamento);
/major : Rota que renderiza uma página com o texto:
Você é maior de idade e possui x anos , onde x deve ser o valor
informado no input do formulário;
/minor : Rota que renderiza uma página com o texto:
Você é menor de idade e possui x anos , onde x deve ser o
valor informado no input do formulário;

Middlewares
Deve haver um middleware que é chamado nas rotas
/major e /minor e checa se a informação de idade não está
presente nos Query Params. Se essa informação não existir deve
redirecionar o usuário para a página inicial com o formulário,
caso contrário o middleware deve apenas continuar com o fluxo normal.

Entrega
Esse desafio não precisa ser entregue e não receberá correção, mas você pode ver o
resultado do código do desafio feito por mim aqui: https://github.com/Rocketseat/bootcamp-n
odejs-desafio-01
PS.: Tente fazer o desafio sem olhar o código antes :)
PS2.: Após concluir o desafio, adicionar esse código ao seu Github é uma boa forma de demonstrar
seus conhecimentos para oportunidades futuras :D
Booooooora dev!!!
“Sua única limitação é você mesmo”!
*/
const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

app.use(express.urlencoded({ extended: false }))

const CkeckMiddleware = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/')
  }
  return next()
}

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')

app.get('/', (req, res) => {
  // return res.send('ben vindo')
  return res.render('age')
})

app.post('/check', (req, res) => {
  // return res.send('ben vindo')
  const { age } = req.body

  console.log(age)
  // bigger = maior
  // smaller = menor

  if (age > 18) {
    return res.redirect(`bigger?age=${age}`)
  } else {
    return res.redirect(`smaller?age=${age}`)
  }
})

app.get('/bigger', CkeckMiddleware, (req, res) => {
  const { age } = req.query
  return res.render('bigger', { age })
})

app.get('/smaller', CkeckMiddleware, (req, res) => {
  const { age } = req.query
  return res.render('smaller', { age })
})

app.listen(3000)
