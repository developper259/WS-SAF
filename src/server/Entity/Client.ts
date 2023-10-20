import * as WebSocket from 'ws';



export class Client {
	socket:WebSocket;
	id: string | null;
	username: string | null;

	constructor (socket: WebSocket) {
		this.socket = socket;
		this.id = null;
		this.username = null;
	}
}