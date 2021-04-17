import { FilterService } from './../../../../services/filters/filter.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'upso-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss', '../../panel.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() list: Array<any>;
  @Input() keys: Array<string>;
  @Output() newList: EventEmitter<Array<any>> = new EventEmitter();
  public textPlaceholder: string;

  constructor(
    protected _filter: FilterService
  ) {
  }

  ngOnInit(): void {
    const keys = this.acomodar(this.keys);
    this.textPlaceholder = 'Filtrar por ' + keys.slice(0, keys.length - 1).join(', ');
    this.textPlaceholder += (keys.length === 1) ? keys[0] : ' o ' + keys[keys.length - 1];
  }

  filtrar({ target: { value } }): void {
    this.newList.emit(this._filter.filtrar(value, this.list, this.keys));
  }

  acomodar(keys: Array<string>): Array<string> {
    let res = [];
    for (const key of keys) {
      const aux = key.split('.');
      res = [...res, aux[aux.length - 1]];
    }
    return res;
  }

}
