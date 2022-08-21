import { Component } from '@angular/core';
import { IpfsService } from './services/ipfs/ipfs.service';
import { OrbitdbService } from './services/orbit-db/orbitdb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-chat';
  uri = "";
  status = "Initializing IPFS...";

  constructor(private ipfsService: IpfsService, public orbitDbService: OrbitdbService) { }

  async ngOnInit() {
    let IPFS = await this.ipfsService.getLocalNode();
    this.status = "Initializing OrbitDB...";

    await this.orbitDbService.loadLocalInstance(IPFS);
    this.status = "Creating OrbitDB database...";

    this.uri = await this.orbitDbService.createDatabase();
    this.status = "Connected!"
  }

  async connectButtonClick() {
    this.status = "Connecting to OrbitDB database...";

    await this.orbitDbService.connectToDatabase(this.uri);
    this.status = "Connected!";
  }

  messageInputEnterKeydown(event: any) {
    const inputValue = event.target.value;
    event.target.value = '';

    this.orbitDbService.sendMessage(inputValue);
  }
}
