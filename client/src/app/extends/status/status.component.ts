import { Router } from '@angular/router';


export class StatusComponent {

  public errores: Array<string>;
  public loading: boolean = false;
  public success: boolean = false;
  public message: string = '';

  public constructor(
    protected _router: Router
  ) { }

  /**
   * Setea en true loading. Además elimina la lista de errores
   */
  protected setLoading(): void{
    this.loading = true;
    this.errores = null;
  }

  /**
   * Crea el arreglo de error. Además setea loading en false, success en false.
   * @param errors arreglo de errores
   */
  protected setErrors(errors: Array<any>): void {
    this.loading = false;
    this.success = false;
    this.errores = errors;
  }

  /**
   * Setea el true success. Además setea en false loading y elimina la lista de errores
   */
  protected setSuccess(): void{
    this.success = true;
    this.loading = false;
    this.errores = null;
  }

  /**
   * Setea el mensaje recibido
   * @param msg
   */
  protected SetMessage(msg: string): void {
    this.message = msg;
  }

  /**
   * Setea un error por defecto
   */
  protected setDefaultError(){
    this.errores = ['Error al recuperar datos. Intente nuevamente'];
  }

  /**
   * Valida una respuesta recibida de la api.
   * Setea success, loading, errores, messages, etc dependiendo del caso.
   * @param data response de la api
   */
  protected validate(data: any): boolean {
    if ( data && data.status && data.status === 'success' ) {
      this.setSuccess();
      if( data.message ) { this.SetMessage(data.message); }
      return true;
    } else if ( data && data.status && data.status === 'error' ) {
      this.setErrors(data.errors);
      if( data.message ) { this.SetMessage(data.message); }
      return false;
    } else {
      this.setDefaultError();
      return false;
    }
  }

  /**
   *
   * @param data
   */
  protected validateNoLoading(data: any): boolean {
    if ( data && data.status && data.status === 'success' ) {
      return true;
    } else if ( data && data.status && data.status === 'error' ) {
      return false;
    } else {
      return false;
    }
  }


}
