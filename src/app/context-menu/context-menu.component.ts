import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, fromEvent, Observable } from 'rxjs';
import { takeUntil, tap, filter } from 'rxjs/operators';

import { panelScale, listStagger } from './animations';
import { MenuItem } from './context-menu.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [panelScale, listStagger]
})
export class ContextMenuComponent {
  private detatch = new Subject<MenuItem>();
  private overlayRef: OverlayRef;
  private clickedMenuItem: MenuItem;
  animationState: '*' | 'void' = '*';
  detach$ = this.detatch.asObservable();
  menuItems: MenuItem[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  initContextMenu(menuItems: MenuItem[], overlayRef: OverlayRef): void {
    this.menuItems = menuItems;
    this.overlayRef = overlayRef;
    this.menuClosingActions()
      .pipe(takeUntil(this.detach$))
      .subscribe(() => {
        this.animationState = 'void';
        this.changeDetectorRef.detectChanges();
      });
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

  private menuClosingActions(): Observable<MouseEvent> {
    return fromEvent(this.overlayRef.backdropElement, 'mousedown').pipe(
      filter((mouseEvent: MouseEvent) => {
        /**
         * Only close if is a left(1)- or right(3)-click is triggered
         */
        return mouseEvent.which === 1 || mouseEvent.which === 3;
      }),
      tap((mouseEvent: MouseEvent) => {
        mouseEvent.preventDefault();
      })
    );
  }
}
