"use strict";
/* var mosca = require("mosca");
var server = new mosca.Server({
  http: {
    port: 1884,
    bundle: true,
    static: './'
  }
});

server.on('clientConnected', function(client: { id: any; }) {
    console.log('client connected', client.id);
});

server.on('published', function(packet: { payload: { toString: () => any; }; }, client: any) {
    console.log('Published', packet.payload.toString());
});

var authenticate = function(client:any, username:any, password:any, callback:any) {
    var authorized = (username === 'xyz' && password.toString() === 'xyz123');
    if (authorized) client.user = username;
    callback("not authorized");
}

server.authenticate = authenticate; */
Object.defineProperty(exports, "__esModule", { value: true });
const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const httpServer = require('http').createServer();
const ws = require('websocket-stream');
const port = 1883;
const wsPort = 3000;
/* server.listen(port, function () {
  console.log('TCP server started and listening on port (mqtt://)', port)
}) */
ws.createServer({ server: httpServer }, aedes.handle);
httpServer.listen(wsPort, function () {
    console.log('WebSocket server listening on port (ws://)', wsPort);
});
var authenticate = function (client, username, password, callback) {
    var authorized = (username === 'xyz' && password.toString() === 'xyz123');
    if (authorized)
        client.user = username;
    callback("not authorized");
};
server.authenticate = authenticate;
//_______________________________________________________________________________________________________
aedes.id = "ServerMQTT_01";
//creo el servidor en el puerto:
server.listen(port, function () {
    console.log('Servidor iniciado en el puerto: \x1b[1m \x1b[31m  ', port + '\x1b[0m');
});
aedes.authenticate = (client, username, password, callback) => {
    if (username && typeof username === 'string' && username === 'xyz') {
        if (password && typeof password === 'object' && password.toString() === 'xyz123') {
            callback(null, true);
            console.log(`Cliente conectado correctamente, fecha: \x1b[38;5;9m	`, new Date().toLocaleString() + '\x1b[0m');
        }
    }
    else {
        callback(false, false);
    }
};
// ref: https://github.com/moscajs/aedes/blob/master/examples/clusters/index.js
aedes.on('subscribe', function (subscriptions, client) {
    console.log('MQTT cliente \x1b[32m' + (client ? client.id : client) +
        '\x1b[0m subscripto al topico: \x1b[33m' + subscriptions.map((s) => s.topic).join('\n'), '\x1b[0m desde el btroker \x1b[32m ', aedes.id + '\x1b[0m');
});
aedes.on('unsubscribe', function (subscriptions, client) {
    console.log('MQTT client \x1b[32m' + (client ? client.id : client) +
        '\x1b[0m cancelado la suscripción al topico: ' + subscriptions.join('\n'), 'desde el btroker \x1b[32m ', aedes.id + '\x1b[0m');
});
// fired when a client connects
aedes.on('client', function (client) {
    console.log('\x1b[34m______________________________________________________________________________\x1b[0m');
    console.log('Cliente conectado: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'desde el btroker \x1b[32m ', aedes.id + '\x1b[0m');
});
// fired when a client disconnects
aedes.on('clientDisconnect', function (client) {
    console.log('Cliente desconectado: \x1b[31m' + (client ? client.id : client) + '\x1b[0m', 'desde el btroker \x1b[32m ', aedes.id + '\x1b[0m');
});
// se emite cuando un cliente publica un paquete de mensajes sobre el topic
aedes.on('publish', function (packet, client) {
    if (client) {
        console.log(`Mensaje publicado por cliente:\x1b[32m  ${(client ? client.id : '\x1b[0m Broker:\x1b[32m ' + aedes.id)} \x1b[0m Mensaje: \x1b[32m "${packet.payload}"\x1b[0m en el topic:  ${packet.topic} al broker:\x1b[32m ${aedes.id}'\x1b[0m'`);
        const centralizadorDato = JSON.parse(packet.payload);
        //const centralizadorDato = packet.payload;
        //  console.log(" Datos Central:"+centralizadorDato )
        /*     function jsToJSONProps(typ: any): any {
              if (typ.jsToJSON === undefined) {
                  const map: any = {};
                  typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
                  typ.jsToJSON = map;
              }
              return typ.jsToJSON;
          }*/
        //--------- REcorro los datos del Centralizador
        console.log("Centralizador: " + centralizadorDato.nom + " , pasw: " + centralizadorDato.pasC + " ,bat:" + centralizadorDato.bat + " ,RSSI:" + centralizadorDato.rssi);
        //---------- Recorro la información de cada pto de medicion
        centralizadorDato.pMed.forEach(element => console.log("Pto de Medicion id:" + element.id + " fecha:" + element.f + " pas:" + element.pas + " bat:" + element.bat + " RSSI:" + element.rssi));
        // -------- Recorro los n Dalo
        let cantidad = centralizadorDato.pMed.length;
        console.log("Cant Pto Med:" + cantidad);
        for (let i = 0; i <= (cantidad - 1); i++) { //recorro los pMed
            console.log("Pto Med key " + i);
            let cantdalo = centralizadorDato.pMed[i].daLo.length; //recorro los daLo
            console.log("Dalo key " + cantdalo);
            for (let j = 0; j <= (cantdalo - 1); j++) {
                var datointer = centralizadorDato.pMed[i].daLo[j];
                console.log(datointer);
            }
            ;
        }
        ;
    }
});
//# sourceMappingURL=brokerWS_Ts.js.map