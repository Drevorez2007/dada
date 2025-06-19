export const ALL_CHECKED = 'checkbox/all';
export const NO_STOPS_CHECKED = 'checkbox/nostops';
export const ONE_STOP_CHECKED = 'checkbox/onestop';
export const TWO_STOPS_CHECKED = 'checkbox/twostops';
export const THREE_STOPS_CHECKED = 'checkbox/threestops';

export function allChecked() {
  return { type: ALL_CHECKED };
}

export function noStopsChecked() {
  return { type: NO_STOPS_CHECKED };
}

export function oneStopChecked() {
  return { type: ONE_STOP_CHECKED };
}

export function twoStopChecked() {
  return { type: TWO_STOPS_CHECKED };
}

export function threeStopChecked() {
  return { type: THREE_STOPS_CHECKED };
}
