import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ContextMenuComponent } from './context-menu.component';

@NgModule({
  declarations: [ContextMenuComponent],
  imports: [
    CommonModule,
    OverlayModule
  ]
})
export class ContextMenuModule { }
