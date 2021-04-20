import { Filter } from './../../../../helpers/filter';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'xeron-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss', '../../panel.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() list: Array<any>;
  @Input() keys: Array<string>;
  @Input() placeholder: string;
  @Output() newList: EventEmitter<Array<any>> = new EventEmitter();
  public textPlaceholder: string;
  public filter: Filter;

  constructor() {
    this.filter = new Filter();
  }

  ngOnInit(): void {
    this.setPlaceHolher(this.placeholder);
  }

  filtrar({ target: { value } }): void {
    this.newList.emit(this.filter.filtrar(value, this.list, this.keys));
  }

  acomodar(keys: Array<string>): Array<string> {
    let res = [];
    for (const key of keys) {
      const aux = key.split('.');
      res = [...res, aux[aux.length - 1]];
    }
    return res;
  }

  private setPlaceHolher(placeholder: string): void {
    if (placeholder === undefined) {
      const keys = this.acomodar(this.keys);
      this.textPlaceholder = 'Filtrar por ' + keys.slice(0, keys.length - 1).join(', ');
      this.textPlaceholder += (keys.length === 1) ? keys[0] : ' o ' + keys[keys.length - 1];
    } else {
      this.textPlaceholder = placeholder;
    }
  }

}
