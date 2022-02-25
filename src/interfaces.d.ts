import Extent from "@arcgis/core/geometry/Extent";

export interface IVisualQuery {
  extent: Extent;
  size: [number, number];
  pixelRatio: number;
}

export interface IVisualData {
  destroy?(): void;
}

export interface IVisualState {
  position: [number, number];
  rotation: number;
  scale: number;
  size: [number, number];
}

export interface IVisualStyle<C, D> {
  load(query: IQuery): Promise<D>;
  render(context: C, state: IVisualState, data: D): void;
}
