import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'favorite-chip',
  templateUrl: './favorite-chip.component.html',
  styleUrls: ['./favorite-chip.component.scss'],
})
export class FavoriteChipComponent  implements OnInit {

  @Input() name: string = "";

  @Output() removeEvent: EventEmitter<string> = new EventEmitter<string>()

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  gotoDetail() {
    this.router.navigate(['/detail', this.name]);
  }

  remove() {
    this.removeEvent.emit(this.name);
  }

}
