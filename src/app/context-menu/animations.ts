import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  stagger,
  keyframes
} from '@angular/animations';

export const panelScale = trigger('panelScale', [
  state('void', style({ opacity: 0, transform: 'scale(0)' })),
  state('*', style({ transform: 'scale(1)' })),
  transition(
    'void => *',
    animate(
      '200ms cubic-bezier(.4, 0, .1, 1)',
      keyframes([
        style({ opacity: 0, transform: 'scale(0)', offset: 0 }),
        style({ opacity: 0.5, transform: 'scale(0.5)', offset: 0.5 }),
        style({ opacity: 1, transform: 'scale(1)', offset: 1 })
      ])
    )
  ),
  transition('* => void', animate('160ms cubic-bezier(.4, 0, .1, 1)', style({ opacity: 0, transform: 'scale(1.08)' })))
]);

export const listStagger = trigger('listStagger', [
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
