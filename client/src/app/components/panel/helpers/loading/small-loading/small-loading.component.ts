import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'xeron-small-loading',
  templateUrl: './small-loading.component.html',
  styleUrls: ['./small-loading.component.scss']
})
export class SmallLoadingComponent implements OnInit {
  @Input() color: string = 'text-dark';

  constructor() { }

  ngOnInit(): void {
  }

}
