import { Component, OnInit } from '@angular/core';
import { ContextMenuService } from './context-menu/context-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'context-menu';

  constructor(private contextMenuService: ContextMenuService) { }

  ngOnInit() {
    this.contextMenuService.triggerOn('contextmenu', [
      'Call',
      'Message',
      'View profile'
    ]);
  }
}
