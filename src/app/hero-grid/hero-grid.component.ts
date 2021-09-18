import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {Hero} from "../hero";
import HeroTable from '../hero-table';

@Component({
  selector: 'app-hero-grid',
  templateUrl: './hero-grid.component.html',
  styleUrls: ['./hero-grid.component.css']
})
export class HeroGridComponent implements OnInit {
  @Input() heroes: Hero[];
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  heroTable = HeroTable;

  constructor() { }

  ngOnInit(): void {
  }

  onUpdateClick(data: any): void {
    this.onUpdate.emit(data.data);
  }

  onDeleteClick(data: any): void {
    this.onDelete.emit(data.data);
  }
}
