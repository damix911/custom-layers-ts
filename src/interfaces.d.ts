import Extent from "@arcgis/core/geometry/Extent";

export interface IQuery {
  extent: Extent;
  size: [number, number];
  pixelRatio: number;
}

export interface IState {
  position: [number, number];
  rotation: number;
  scale: number;
  size: [number, number];
  pixelRatio: number;
}

export interface IPainter<C, D> {
  load(query: IQuery): Promise<D>;
  unload(data: D): void;
  render(context: C, state: IState, data: D): void;
}
