import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subscription, fromEvent, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { ContextMenuComponent } from './context-menu.component';

type ContextMenuTrigger = 'contextmenu';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  private overlayRef: OverlayRef;
  private subscription = new Subscription();

  constructor(private overlay: Overlay) {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'transparent-backdrop'
    });
    this.subscription.add(
      this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach())
    );
  }

  onDestroy(): void {
    this.subscription.unsubscribe();
  }

  triggerOn(
    trigger: ContextMenuTrigger,
    menuItems: string[],
    element?: HTMLElement | Document
  ): void {
    this.subscription.add(
      fromEvent(element ? element : document, trigger).subscribe((event: MouseEvent) => {
        this.attachContextMenu(event, menuItems);
      })
    );
  }

  open(event: MouseEvent, menuItems: string[]): Observable<string> {
    return this.attachContextMenu(event, menuItems);
  }

  private attachContextMenu(event: MouseEvent, menuItems: string[]): Observable<string> {
    event.preventDefault();
    this.overlayRef.detach();
    this.overlayRef.updatePositionStrategy(this.getCursorPosition(event));
    const portal = new ComponentPortal(ContextMenuComponent);
    const componentRef = this.overlayRef.attach(portal);
    const contextMenuComp = componentRef.instance;
    contextMenuComp.initContextMenu(menuItems);
    fromEvent(this.overlayRef.backdropElement, 'contextmenu')
      .pipe(take(1))
      .subscribe(() => this.overlayRef.detach());
    return contextMenuComp.detach$.pipe(take(1), tap(() => this.overlayRef.detach()));
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
