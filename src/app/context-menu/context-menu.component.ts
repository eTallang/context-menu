import { Component, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';

import { listAnimation } from './animations';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [ listAnimation ]
})
export class ContextMenuComponent {
  private detatch = new Subject<string>();
  detach$ = this.detatch.asObservable();
  
  menuItems: string[] = [];

  initContextMenu(menuItems: string[]): void {
    this.menuItems = menuItems;
  }

  menuClick(menuItemClicked: string): void {
    this.detatch.next(menuItemClicked);
    this.detatch.complete();
  }
}
