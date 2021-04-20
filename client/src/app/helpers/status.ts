import { GLOBAL } from './global';
class Status {

  public errores: Array<string>;
  public loading: boolean;
  public success: boolean;
  public message: string;

  public constructor() {
    this.loading = false;
    this.success = false;
    this.message = '';
  }

  /**
   * Setea en true loading. Además elimina la lista de errores
   */
  public setLoading(): void {
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
  public setSuccess(): void {
    this.success = true;
    this.loading = false;
    this.errores = null;
  }

  /**
   * Setea un mesanje
   * @param msg mensaje
   */
  public SetMessage(msg: string): void {
    this.message = msg;
  }

  /**
   * Setea un error por defecto
   */
  protected setDefaultError(data): void {
    this.errores = ['Error al recuperar datos. Intente nuevamente'];
    console.warn(data);
  }

  public processError(data: any): void {
    if ((data.status >= 400 && data.status < 600)) {
      this.setErrors((
        data.error.length && data.error.length > 0)
        ? data.error
        : (data.message)
          ? [data.message]
          : [data.error]
      );
    } else {
      this.setDefaultError(data);
    }
    if (
      data.status === 490) {
      const params = 'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=400,height=500,left=100,top=100';
      const loginWindow = window.open(GLOBAL.web + '/panel/login/popup', 'Login', params);
      loginWindow.addEventListener('popstate', (event) => {
        loginWindow.close();
      });
    }
  }
}

export default Status;
