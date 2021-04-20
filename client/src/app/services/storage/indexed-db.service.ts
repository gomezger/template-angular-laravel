import { GLOBAL } from '../../helpers/global';
import { StorageService } from './storage.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class IndexedDBService extends StorageService {

  constructor(
    private dbService: NgxIndexedDBService
  ) {
    super();
    this.storage = GLOBAL.indexedDB.table; // el nombre de la base de datos está en el module y global.ts
  }

  /**
   * Guarda el calue con el a clave key con una fehca de expiracion en N days.
   * Es asincrónico, por lo cual hay que usar await para que funcione sincrónico.
   * @param key clave del dato
   * @param value datoa guardar
   * @param days cantidad de dias por el cual es valido el dato.
   */
  async setItem(key: string, value: any, days: number = this.days) {
    try {
      await this.dbService.update(this.storage, { key: this.generateKey(key), value: JSON.stringify(this.create(value, days)) }).subscribe(
        (storeData) => true,
        (error) => false
      );
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  /**
   * Obtenes el valor con una clave key.
   * Es asincrónico, por lo cual hay que usar await para que funcione sincrónico.
   * @param key clave con la cual se guardo
   */
  async getItem(key: string) {
    try {
      key = this.generateKey(key);
      const result = await this.dbService.getByKey(this.storage, key).toPromise(); // busco el dato
      const value = (result && result.value) ? JSON.parse(result.value) : null; // lo parseo si no es nulo
      return value && value.expires && !this.expires(value.expires, key) ? value.data : null; // si no expirón retorno el dato
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * Eliminar un dato de storage
   * Es asincrónico, por lo cual hay que usar await para que funcione sincrónico.
   * @param key clave con la que se guarda el dato
   */
  async removeItem(key: string) {
    await this.dbService.delete(this.storage, this.generateKey(key)).toPromise();
  }
}
