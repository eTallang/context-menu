import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ContextMenuComponent } from './context-menu.component';
import { ContextMenuModule } from './context-menu.module';

export interface MenuItem {
  name: string;
  action?: () => any;
}

@Injectable({
  providedIn: ContextMenuModule
})
export class ContextMenuService {
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay) {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'transparent-backdrop'
    });
  }

  open(event: MouseEvent, menuItems: MenuItem[]): Observable<MenuItem> {
    event.preventDefault();
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }

    this.overlayRef.updatePositionStrategy(this.getCursorPosition(event));
    const portal = new ComponentPortal(ContextMenuComponent);
    const componentRef = this.overlayRef.attach(portal);
    const contextMenuComp = componentRef.instance;
    contextMenuComp.initContextMenu(menuItems, this.overlayRef);
    return contextMenuComp.detach$.pipe(tap(() => {
      this.overlayRef.detach()
    }));
  }

  private getCursorPosition(event: MouseEvent) {
    return this.overlay
      .position()
      .flexibleConnectedTo({ x: event.clientX, y: event.clientY })
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        },
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'bottom'
        },
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top'
        },
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'bottom'
        }
      ]);
  }
}
