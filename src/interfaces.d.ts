export interface IQuery {
  extent: Extent;
  size: [number, number];
  pixelRatio: number;
}

export interface IVisualData {
  destroy(): void;
}

export interface IVisualState {
  translation: [number, number];
  rotation: number;
  scale: number;
  size: [number, number];
}

export interface ICanvas2DStyle<D> {
  load(query: IQuery): Promise<D>;
  render(ctx: Canvas2DRenderingContext, state: IVisualState, data: D): void;
}

export interface IWebGLStyle<D> {
  load(query: IQuery): Promise<D>;
  render(gl: WebGLRenderingContext, state: IVisualState, data: D): void;
}
