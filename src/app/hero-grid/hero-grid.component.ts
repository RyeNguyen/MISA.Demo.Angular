import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {Hero} from "../hero";
import HeroTable from '../hero-table';
import { PopupDataService } from '../services/popup-data.service';

@Component({
  selector: 'app-hero-grid',
  templateUrl: './hero-grid.component.html',
  styleUrls: ['./hero-grid.component.css']
})
export class HeroGridComponent implements OnInit {
  @Input() heroes: Hero[];
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  heroTable = HeroTable;

  constructor(private _popupService: PopupDataService) { }

  ngOnInit(): void {
  }

  onUpdateClick(data: any): void {
    //this.onUpdate.emit(data.data);
    this._popupService.bindHeroInfo(data.data);
    this._popupService.setPopupType(false);
    this._popupService.setPopupVisible(true);
  }

  onDeleteClick(data: any): void {
    this.onDelete.emit(data.data);
  }
}
