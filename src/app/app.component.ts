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
      .open(event, [
        { name: 'Call', action: () => alert('Hei du') },
        { name: 'Message' },
        { name: 'View profile' },
        { name: 'Delete request' },
        { name: 'Block user' },
        { name: 'Edit alias' },
        { name: 'See all requests' }
      ])
      .subscribe(selectedItem => (this.selectedItem = selectedItem.name));
  }

  openOtherMenu(event: MouseEvent): void {
    this.contextMenuService
      .open(event, [{ name: 'Other menu' }])
      .subscribe(selectedItem => (this.selectedItem = selectedItem.name));
  }
}
