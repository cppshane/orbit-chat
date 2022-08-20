import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IpfsService } from './services/ipfs/ipfs.service';
import { OrbitdbService } from './services/orbit-db/orbitdb.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [IpfsService, OrbitdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
