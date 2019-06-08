import { PositionStrategy } from '@angular/cdk/overlay';
import { OverlayReference } from '@angular/cdk/overlay/typings/overlay-reference';

export class ContextMenuPositionStrategy implements PositionStrategy {
  private overlayRef: OverlayReference;

  constructor(private x: number, private y: number) {}

  attach(overlayRef: OverlayReference): void {
    this.overlayRef = overlayRef;
  }

  apply(): void {
    this.overlayRef.overlayElement.style.top = `${this.y}px`;
    this.overlayRef.overlayElement.style.left = `${this.x}px`;
  }

  dispose(): void {
    this.overlayRef = null;
  }
}
