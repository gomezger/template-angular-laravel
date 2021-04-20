import { GLOBAL } from './helpers/global';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebComponent } from './components/web/web.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';


const dbConfig: DBConfig = {
  name: GLOBAL.indexedDB.database,
  version: 1,
  objectStoresMeta: [
    {
      store: GLOBAL.indexedDB.table,
      storeConfig: { keyPath: 'key', autoIncrement: false },
      storeSchema: []
    }
  ]
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
