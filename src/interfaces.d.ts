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

export interface IData<C = void> {
  update?(context: C): void;
  unload?(): void;
}

export interface IPainter<C, D extends IData> {
  load(query: IQuery): Promise<D>;
  render(context: C, state: IState, data: D): void;
}
