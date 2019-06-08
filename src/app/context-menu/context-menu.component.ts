import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContextMenuComponent {
  menuItems: string[] = [];

  initContextMenu(menuItems: string[]): void {
    this.menuItems = menuItems;
  }
}
