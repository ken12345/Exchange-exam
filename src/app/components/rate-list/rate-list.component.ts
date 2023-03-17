import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rate-list',
  templateUrl: './rate-list.component.html',
  styleUrls: ['./rate-list.component.scss'],
})
export class RateListComponent  implements OnInit {

  @Output() favoriteEvent: EventEmitter<string> = new EventEmitter<any>(); 

  @Input() currencyName: string = "";

  @Input() rate: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {}

  addFavorite() {
    this.favoriteEvent.emit(this.currencyName);
  }

  go() {
    this.router.navigate(['/detail', this.currencyName]);
  }



}
