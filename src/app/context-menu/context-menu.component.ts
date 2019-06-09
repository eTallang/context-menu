import { Component, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';

import { panelScale, listStagger } from './animations';
import { MenuItem } from './context-menu.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [ panelScale, listStagger ]
})
export class ContextMenuComponent {
  private detatch = new Subject<MenuItem>();
  detach$ = this.detatch.asObservable();
  
  menuItems: MenuItem[] = [];

  initContextMenu(menuItems: MenuItem[]): void {
    this.menuItems = menuItems;
  }

  menuClick(menuItemClicked: MenuItem): void {
    if (menuItemClicked.action) {
      menuItemClicked.action();
    }
    this.detatch.next(menuItemClicked);
    this.detatch.complete();
  }
}
