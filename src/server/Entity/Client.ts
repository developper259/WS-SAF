import * as WebSocket from 'ws';



export class Client {
	socket:WebSocket;
	id: string | null;
	username: string | null;
	teamID: string | null;
	version: string | null;

	constructor (socket: WebSocket) {
		this.socket = socket;
		this.id = null;
		this.username = null;
		this.teamID = null;
		this.version = null;
	}

	isEmpty() {
		if (!this.id || !this.username || !this.teamID || !this.version) return true;
		return false;
	}


	define(username: string, id: string, teamID: string, version: string) {
		this.username = username;
		this.id = id;
		this.teamID = teamID;
		this.version = version;
	}
}