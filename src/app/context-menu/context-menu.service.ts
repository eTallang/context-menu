import { Injectable } from '@angular/core';
import { Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { Subscription, fromEvent } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { ContextMenuComponent } from './context-menu.component';
import { OverlayReference } from '@angular/cdk/overlay/typings/overlay-reference';
import { ContextMenuPositionStrategy } from './context-menu-position-strategy';

type ContextMenuTrigger = 'contextmenu';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  private overlayRef: OverlayRef;
  private contextMenuComp: ContextMenuComponent;
  private subscription = new Subscription;

  constructor(private overlay: Overlay) {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      panelClass: 'context-menu-panel'
    });
  }

  onDestroy(): void {
    this.subscription.unsubscribe();
  }

  triggerOn(trigger: ContextMenuTrigger, menuItems: string[], element?: HTMLElement | Document): void {
    this.subscription.add(
      fromEvent(element ? element : document, trigger).subscribe((event: MouseEvent) => {
        event.preventDefault();
        if (this.overlayRef.hasAttached()) {
          this.overlayRef.detach();
        }
        this.overlayRef.updatePositionStrategy(new ContextMenuPositionStrategy(event.clientX, event.clientY));
        const portal = new ComponentPortal(ContextMenuComponent);
        const componentRef = this.overlayRef.attach(portal);
        this.contextMenuComp = componentRef.instance;
        this.contextMenuComp.initContextMenu(menuItems);
      })
    );
  }
}
