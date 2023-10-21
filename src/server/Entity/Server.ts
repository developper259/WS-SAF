import * as WebSocket from 'ws';
import { Client } from './Client';

export class Server {
  port: number;
  server: WebSocket.Server;
  clients: Client[];

  constructor() {
    this.port = 4433;
    this.server = new WebSocket.Server({ port: this.port });
    this.clients = [];

    this.server.on('connection', (socket: WebSocket) => {
      this.onConnection(socket);

      socket.on('message', (message: string) => {
        this.onMessage(message, socket);
      });

      socket.on('close', () => {
        this.onClose(socket);
      });
    });
  }

  onConnection(socket: WebSocket) {
    const client = new Client(socket);
    this.clients.push(client);
    console.log(this.clients);
    const timeout = setTimeout(() => {
      const client = this.getClient(socket);

      if (client.isEmpty() && client != undefined) socket.close();
      else clearTimeout(timeout);
    }, 10000);
  }

  onMessage(data: string, socket: WebSocket) {
    let client = this.getClient(socket);
    data = `${data}`;
    if (!client) return;

    if (client.isEmpty()) {
      try {
        const objetJSON = JSON.parse(data);
        console.log(objetJSON);
      } catch (erreur) {
        console.error("Erreur lors de l'analyse du JSON :" + data);
        socket.close();
      }
    }
  }

  onClose(socket: WebSocket) {
    const client = this.getClient(socket);
    if (client) {
      const index = this.clients.indexOf(client);
      if (index !== -1) {
        this.clients.splice(index, 1);
        console.log('Client déconnecté');
        console.log(this.clients);
      }
    }
  }

  getClient(socket: WebSocket): Client | undefined {
    return this.clients.find((client) => client.socket === socket);
  }
}
