/*const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io").listen(server);
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

io.on("connection", function(socket) {
  console.log("Alguem se conectou..");
});

const port = new SerialPort("/dev/cu.SLAB_USBtoUART", { baudRate: 9600 });
034 91670261                       
const parser = new Readline();
port.pipe(parser);

parser.on("data", line => console.log(`> ${line}`));
//parser.on("data", line => console.log("\n"));
port.write("ROBOT POWER ON\n");
//> ROBOT ONLINE

port.on("open", onOpen);
port.on("data", onData);

function onData(dato) {
  io.sockets.emit("leitura", dato);
  //aqui consegue pegar os dados no browser
  io.emit("leitura:dato", {
    value: dato.toString()
  });
}

function onOpen() {
  console.log("Arduino Conectado");
}

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

server.listen(3000, function() {
  console.log("El servidor");
});
*/

const express = require("express");
const socketIo = require("socket.io");
const http = require("http");

const app = express();
const server = require("http").Server(app);
const io = socketIo.listen(server);

io.on("connection", function(socket) {
  console.log("a new socket connected");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();

const mySerial = new SerialPort("/dev/cu.SLAB_USBtoUART", {
  baudRate: 9600
});

mySerial.on("open", function() {
  console.log("Opened Serial Port");
});

mySerial.on("data", function(data) {
  //console.log(data);
  console.log(data.res.get());

  // io.emit("arduino:data", {
  // value: data.toString()
  // });
});

mySerial.on("error", function(err) {
  console.log(err.message);
});

server.listen(3000, () => {
  console.log("server on port", 3000);
});
