const SerialPort = require("serialport");
const ReadLine = SerialPort.parsers.Readline;
const parser = new ReadLine();

const mySerial = new SerialPort("/dev/cu.SLAB_USBtoUART0", {
  baudRate: 9600
});

mySerial.on("open", function() {
  console.log("connection is opened");
});
