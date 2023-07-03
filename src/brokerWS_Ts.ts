import { Centralizador } from "./interface"

const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const httpServer = require('http').createServer()
const ws = require('websocket-stream')
const port = 1883
const wsPort = 3000

ws.createServer({ server: httpServer }, aedes.handle)

httpServer.listen(wsPort, function () {
  console.log('WebSocket server listening on port (ws://)', wsPort)
})

var authenticate = function (client: any, username: any, password: any, callback: any) {
  var authorized = (username === 'xyz' && password.toString() === 'xyz123');
  if (authorized) client.user = username;
  callback("not authorized");
}

server.authenticate = authenticate;
//_______________________________________________________________________________________________________
aedes.id = "ServerMQTT_01";

//creo el servidor en el puerto:
server.listen(port, function () {
  console.log('Servidor iniciado en el puerto: \x1b[1m \x1b[31m  ', port + '\x1b[0m')
});


aedes.authenticate = (client: any, username: any, password: any, callback: any) => {
  if (username && typeof username === 'string' && username === 'xyz') {
    if (password && typeof password === 'object' && password.toString() === 'xyz123') {
      callback(null, true);
      console.log(`Cliente conectado correctamente, fecha: \x1b[38;5;9m	`, new Date().toLocaleString() + '\x1b[0m');
    }
  } else {
    callback(false, false);

  }
};

// ref: https://github.com/moscajs/aedes/blob/master/examples/clusters/index.js
aedes.on('subscribe', function (subscriptions: any, client: any) {
  console.log('MQTT cliente \x1b[32m' + (client ? client.id : client) +
    '\x1b[0m subscripto al topico: \x1b[33m' + subscriptions.map((s: any) => s.topic).join('\n'), '\x1b[0m desde el btroker \x1b[32m ', aedes.id + '\x1b[0m')
})

aedes.on('unsubscribe', function (subscriptions: any, client: any) {
  console.log('MQTT client \x1b[32m' + (client ? client.id : client) +
    '\x1b[0m cancelado la suscripción al topico: ' + subscriptions.join('\n'), 'desde el btroker \x1b[32m ', aedes.id + '\x1b[0m')
})

// fired when a client connects
aedes.on('client', function (client: any) {
  console.log('\x1b[34m______________________________________________________________________________\x1b[0m');
  console.log('Cliente conectado: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'desde el btroker \x1b[32m ', aedes.id + '\x1b[0m')
})

// fired when a client disconnects
aedes.on('clientDisconnect', function (client: any) {
  console.log('Cliente desconectado: \x1b[31m' + (client ? client.id : client) + '\x1b[0m', 'desde el btroker \x1b[32m ', aedes.id + '\x1b[0m')
})

// se emite cuando un cliente publica un paquete de mensajes sobre el topic
aedes.on('publish', function (packet: any, client: any) {
  if (client) {
    console.log(`Mensaje publicado por cliente:\x1b[32m  ${(client ? client.id : '\x1b[0m Broker:\x1b[32m ' + aedes.id)} \x1b[0m Mensaje: \x1b[32m "${packet.payload}"\x1b[0m en el topic:  ${packet.topic} al broker:\x1b[32m ${aedes.id}'\x1b[0m'`)

    const centralizadorDato: Centralizador = JSON.parse(packet.payload);

    //--------- REcorro los datos del Centralizador
    console.log("Centralizador: " + centralizadorDato.nom + " , pasw: " + centralizadorDato.pasC + " ,bat:" + centralizadorDato.bat + " ,RSSI:" + centralizadorDato.rssi);
    //---------- Recorro la información de cada pto de medicion
    centralizadorDato.pMed.forEach(element => console.log("Pto de Medicion id:" + element.id + " fecha:" + element.f + " pas:" + element.pas + " bat:" + element.bat + " RSSI:" + element.rssi));
   // -------- Recorro los n Dalo
    let cantidad = centralizadorDato.pMed.length;
    console.log("Cant Pto Med:"+cantidad )
    for (let i = 0; i <= (cantidad - 1); i++) {   //recorro los pMed
        let cantdalo = centralizadorDato.pMed[i].daLo.length; 
        console.log("Pto Med id:"+ i + " Cant.DaLo:"+cantdalo);
        for (let j = 0; j <= (cantdalo - 1); j++) {//recorro los daLo
        var datointer=  centralizadorDato.pMed[i].daLo[j] ;
        console.log(datointer);
     
    }; 
  };

  }

  }

);


