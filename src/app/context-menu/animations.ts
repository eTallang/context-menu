import { trigger, style, transition, animate, query, stagger } from '@angular/animations';

export const listAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        stagger('50ms', [animate('250ms 100ms ease-in', style({ opacity: 1 }))])
      ],
      { optional: true }
    )
  ])
]);
