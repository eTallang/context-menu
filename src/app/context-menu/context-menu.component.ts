import { Component, ViewEncapsulation } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  private overlayRef: OverlayRef;
  private clickedMenuItem: MenuItem;
  animationState: '*' | 'void' = '*';
  detach$ = this.detatch.asObservable();
  menuItems: MenuItem[] = [];

  initContextMenu(menuItems: MenuItem[], overlayRef: OverlayRef): void {
    this.menuItems = menuItems;
    this.overlayRef = overlayRef;
    // fromEvent(this.overlayRef.backdropElement, 'contextmenu')
    //   .pipe(takeUntil(this.destroyed))
    //   .subscribe(() => this.overlayRef.detach());
    this.overlayRef.backdropClick().pipe(takeUntil(this.detach$)).subscribe(() => this.animationState = 'void');
  }

  menuClick(clickedMenuItem: MenuItem): void {
    if (clickedMenuItem.action) {
      clickedMenuItem.action();
    }
    this.clickedMenuItem = clickedMenuItem;
    this.animationState = 'void';
  }

  closePanel(): void {
    if (this.animationState === 'void') {
      this.detatch.next(this.clickedMenuItem);
      this.detatch.complete();
    }
  }
}
