import { Component, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject } from 'rxjs';

export const height = trigger('height', [
  state(
    'void',
    style({
      transform: 'scale(.9)',
      opacity: '0.3',
      overflow: 'hidden'
    })
  ),
  state(
    '*',
    style({
      transform: 'scale(1)',
      opacity: '1',
      overflow: 'hidden'
    })
  ),
  transition('void <=> *', animate('150ms cubic-bezier(.4, 0, .1, 1)'))
]);

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [ height ]
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
