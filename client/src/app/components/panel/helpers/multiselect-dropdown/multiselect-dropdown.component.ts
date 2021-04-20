import { Component, Input, OnInit } from '@angular/core';
import { Filter } from './../../../../helpers/filter';

@Component({
  selector: 'xeron-multiselect-dropdown',
  templateUrl: './multiselect-dropdown.component.html',
  styleUrls: ['./multiselect-dropdown.component.scss']
})
export class MultiselectDropdownComponent implements OnInit {
  @Input() tag: string;
  @Input() list: Array<any>;
  @Input() key: string;
  @Input() selected: Array<any>;
  public listFilter: Array<any>;
  public agregar: boolean;
  public filterHelper: Filter;

  constructor() {
    this.filterHelper = new Filter();
  }

  ngOnInit(): void {
    this.listFilter = [...this.list];
    this.agregar = false;
  }

  filter({ target: { value } }): void {
    this.listFilter = this.filterHelper.filtrar(value, this.list, [this.key]);
  }

  add(item: any): void {
    const indexSelected = this.selected.findIndex((element) => element.id === item.id);
    if (indexSelected === -1) {
      this.selected.push(item);
      this.listFilter = [...this.list];
    }
  }

  remove(item: any): void {
    const indexSelected = this.selected.findIndex((element) => element.id === item.id);
    if (indexSelected >= 0) {
      this.selected.splice(indexSelected, 1);
    }
  }

}
