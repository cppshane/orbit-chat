import { Injectable } from '@angular/core';

declare var OrbitDB: any;

@Injectable({
  providedIn: 'root'
})
export class OrbitdbService {
  messages = new Array<string>();
  private _localInstance: any;
  private _database: any;

  async loadLocalInstance(IPFS: any) {
    this._localInstance = await OrbitDB.createInstance(IPFS);
  }

  async createDatabase() {
    let peerId = await this._localInstance.identity.id;
    this._database = await this._localInstance.feed("orbitchat.messages." + peerId, {
      accessController: {
        write: ["*"]
      },
      localOnly: false,
      overwrite: true,
      replicate: true
    });

    this._database.events.on('replicated', () => {
      this.updateMessages();
    });

    this._database.events.on('ready', () => {
      this.updateMessages();
    });

    this._database.events.on('write', (address: any, entry: any, heads: any) => {
      this.updateMessages();
    });

    await this._database.load();

    const address = await this._database.id;
    return address;
  }

  async connectToDatabase(address: string) {
    await this._database.close();
    this._database = await this._localInstance.open(address);

    this._database.events.on('replicated', () => {
      this.updateMessages();
    });

    this._database.events.on('ready', () => {
      this.updateMessages();
    });

    this._database.events.on('write', (address: any, entry: any, heads: any) => {
      this.updateMessages();
    });

    await this._database.load();
  }

  updateMessages() {
    const items = this._database.iterator({ limit: -1 }).collect().map((e: any) => e.payload.value);
    let i = 0;
    items.forEach((e: any) => {
      if (i < this.messages.length) {
        this.messages[i] = e;
      }
      else {
        this.messages.push(e);
      }

      i++;
    });
  }

  async sendMessage(message: string) {
    if (this._database) {
      await this._database.add(message);
    }
  }
}
