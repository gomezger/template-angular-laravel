export class Filter {

  constructor() { }

  filtrar = (value: string, colection: Array<any>, keys: Array<string>): Array<any> => {
    return (value.length === 0)
      ? colection
      : colection.filter((element) => this.filtarAux(element, value, keys));
  }

  private filtarAux = (element: any, value: string, keys: Array<string>): boolean => {
    for (const keyGroup of keys) {
      let dato = element;
      for (const key of keyGroup.split('.')){
        dato = (dato[key]) ? dato[key] : undefined;
      }
      if (dato && dato.toLowerCase().search(value.toLowerCase()) !== -1){
        return true;
      }
    }
    return false;
  }

}
