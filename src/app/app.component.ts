import { Component } from '@angular/core';

import { ContextMenuService } from './context-menu/context-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  selectedItem: string;

  constructor(private contextMenuService: ContextMenuService) {}

  openMenu(event: MouseEvent): void {
    this.contextMenuService
      .open(event, ['Call', 'Message', 'View profile'])
      .subscribe(selectedItem => (this.selectedItem = selectedItem));
  }

  openOtherMenu(event: MouseEvent): void {
    this.contextMenuService
      .open(event, ['Other menu'])
      .subscribe(selectedItem => (this.selectedItem = selectedItem));
  }
}
