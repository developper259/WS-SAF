import WebSocket from 'ws';

export class Client {
  adress: string;
  port: string;
  socket: WebSocket;
  version: string;

  username: string;
  id: string;
  teamID: string;

  constructor (adress: string, port: string, username: string, teamID: string) {
    this.adress = adress;
    this.port = port;
    this.version = "1.0.0";

    this.username = username;
    this.id = this.genID();
    this.teamID = teamID;

    this.socket = new WebSocket('ws://' + this.adress + ':' + this.port);

    this.socket.on('open', () => {
      this.onOpen();
    });

    this.socket.on('message', (message: string) => {
      this.onMessage(message);
    });

    this.socket.on('close', () => {
      this.onClose();
    });
  }

  onOpen() {
    console.log('You have been connected');

    const data = {
      type: "client",
      id: this.id,
      username: this.username,
      teamID: this.teamID,
      version: this.version
    };

    this.socket.send(JSON.stringify(data));
  }

  onMessage(message: string) {
    const data = JSON.parse(`${message}`);
    if (data["succes"] == false) console.log(data["message"]);
  }

  onClose() {
    console.log('You have been kicked');
  }

  genID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';

    for (let i = 0; i < 32; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }

    return id;
  }
}