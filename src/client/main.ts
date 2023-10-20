import WebSocket from 'ws';

const adress = "localhost";
const port = "4433";


const client = new WebSocket('ws://' + adress + ':' + port);

client.on('open', () => {
  console.log('Connexion WebSocket établie.');

  client.send('Bonjour, serveur WebSocket !');
});

client.on('message', (message: string) => {
  console.log(`Message du serveur : ${message}`);
});

client.on('close', () => {
  console.log('Connexion WebSocket fermée.');
});
