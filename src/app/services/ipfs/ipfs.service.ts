import { Injectable } from '@angular/core';
import { IPFS, create } from 'ipfs-core';
import { BehaviorSubject, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpfsService {
  private _ipfsSource = new BehaviorSubject<null | IPFS>(null);
  private _createIPFSNodePromise: Promise<IPFS>;

  private get LocalIPFS() {
    const getter = async () => {
      let node = this._ipfsSource.getValue();

      if (node == null) {
        console.log("Waiting for node creation...")

        node = await this._createIPFSNodePromise as IPFS
        this._ipfsSource.next(node);
      }

      return node;
    }

    return getter();
  }

  constructor() {
    const ipfsOptions = {
      repo: './ipfs',
      start: true,
      preload: {
        enabled: false
      },
      EXPERIMENTAL: {
        ipnsPubsub: true,
      },
      config: {
        Addresses: {
          Swarm: [
            '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
          ]
        },
      }
    };

    this._createIPFSNodePromise = create(ipfsOptions);
  }

  async getLocalNode() {
    return await this.LocalIPFS;
  }
}
