import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';

import { ContextMenuComponent } from './context-menu.component';

@NgModule({
  declarations: [ContextMenuComponent],
  imports: [CommonModule, OverlayModule, MatRippleModule],
  entryComponents: [ContextMenuComponent]
})
export class ContextMenuModule {}
