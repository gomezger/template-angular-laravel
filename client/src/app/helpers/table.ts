
export class Table<T>{

  public elements_filter: Array<T>;

  constructor(
    public elements: Array<T> = [],
    public itemsPerPage = 10,
    public currentPage = 1
  ) {
    this.elements_filter = [...this.elements];
  }

  resetFilter = (): void => {
    this.elements_filter = [...this.elements];
  }

  insertElement = (element: T): void => {
    this.elements = [element, ...this.elements];
    this.resetFilter();
  }

  updateElement = (element: T): void => {
    const id = 'id';
    this.elements.splice(this.elements.indexOf(this.elements.find((item) => item[id] === element[id])), 1, element);
    this.resetFilter();
  }

  deleteElement = (element: T): void => {
    this.elements.splice(this.elements.indexOf(element), 1);
    if (this.elements.length / this.itemsPerPage < this.currentPage) {
      this.currentPage--;
    }
    this.resetFilter();
  }

}

