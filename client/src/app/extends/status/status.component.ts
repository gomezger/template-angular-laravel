

export class StatusComponent {

  public errores: Array<string>;
  public loading: boolean = false;
  public success: boolean = false;
  public success_message: string = '';

  
  protected setLoading(bool: boolean): void{
    this.loading = bool;
    this.errores = null;
  }

  protected setErrors(errors: Array<any>): void {
    this.setLoading(false);
    this.setSuccess(false);
    this.errores = errors;
  }

  protected setSuccess(bool: boolean): void{
    this.success = bool;
    this.setLoading(false);
    this.errores = null;
  }

  protected SetSuccessMessage(msg: string): void {
    this.success_message = msg;
  }

  protected setDefaultError(){
    this.errores = ['Error al recuperar datos. Intente nuevamente'];
  }

  protected validateResponse(data: any): boolean {
    if ( data && data.status && data.status === 'success' ) {
      this.setSuccess(true);
      return true;
    } else if ( data && data.status && data.status === 'error' ) {
      this.setErrors(data.errors);
      return false;
    } else {
      this.setErrors(['Error. Intente nuevamente']);
      return false;
    }
  }


}
