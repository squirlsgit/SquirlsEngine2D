

export interface Size {
  width: number,
  height: number
}
export interface Position {
  x: number,
  y: number
}

export interface Vector {

  start: Position;
  alpha: number;
}

export interface AbsolutePosition {
  x: number,
  y: number,
  y_cartesian: number
}

export interface Line {
  start: Position;
  m: number;
  xfin: number;
}
