import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

export const height = trigger('height', [
  state(
    'void',
    style({
      transform: 'scale(.8)',
      opacity: '0.3',
      overflow: 'hidden'
    })
  ),
  state(
    '*',
    style({
      transform: 'scale(1)',
      opacity: '1',
      overflow: 'hidden'
    })
  ),
  transition('void <=> *', animate('180ms cubic-bezier(.4, 0, .1, 1)'))
]);

export const listAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        stagger('40ms', [animate('200ms 100ms ease-in', style({ opacity: 1 }))])
      ],
      { optional: true }
    )
  ])
]);
