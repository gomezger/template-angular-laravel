import { GLOBAL } from './../../helpers/global';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  protected storage;
  protected days: number;
  protected prefix: string;

  protected constructor() {
    this.storage = localStorage;
    this.days = 14;
    this.prefix = GLOBAL.storageKey;
  }

  /**
   * Guarda el calue con el a clave key con una fehca de expiracion en N days
   * @param key clave del dato
   * @param value datoa guardar
   * @param days cantidad de dias por el cual es valido el dato.
   */
  public setItem(key: string, value: any, days: number = this.days) {
    try {
      const data = this.create(value, days); // seteo el vencimiento de dato
      this.storage.setItem(this.generateKey(key), JSON.stringify(data)); // lo guardo en el storage
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Obtenes el valor con una clave key.
   * @param key clave con la cual se guardo
   */
  public getItem(key: string) {
    try {
      key = this.generateKey(key);
      const value = JSON.parse(this.storage.getItem(key)); // obtengo el data del storage
      return value && value['data'] !== null && !this.expires(value['expires'], key) // si expiró el dato, lo elimino y retorno null
        ? value['data']
        : null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * Eliminar un dato de storage
   * @param key clave con la que se guarda el dato
   */
  public removeItem(key: string) {
    this.storage.removeItem(this.generateKey(key));
  }

  /**
   * Devuelve true si el valor con clave key expiró. Si es true, tambien lo elimina del storage
   * @param expires fecha en formato número en que expira
   * @param key clave del dato
   * @returns true o false
   */
  protected expires(expires: number, key: string): boolean {
    const today = Date.now();
    const expired = expires < today;
    if (expired) { this.removeItem(key); }
    return expired;
  }

  /**
   * Crea un objeto con la fecha de creacion (start), la fecha en que expira (expires) y el valor
   * @param value valor a guardar en el storage
   * @param dias dias que dura el dato
   */
  protected create(value: any, dias: number) {
    return {
      start: Date.now(),
      expires: this.addDays(dias).getTime(),
      data: value,
    };
  }

  /**
   * Agrega N días a la fecha actual
   * @param days cantidad de días
   * @returns fecha con los N días agregados
   */
  protected addDays(days: number): Date {
    const date = new Date(Date.now());
    date.setDate(date.getDate() + days);
    return date;
  }

  protected generateKey = (key: string): string => this.prefix + '-' + key;

}
