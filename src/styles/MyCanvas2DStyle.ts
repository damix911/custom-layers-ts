import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import { IVisualData, IVisualQuery, IVisualState, IVisualStyle } from "../interfaces";
import { defined } from "../util/assert";

interface IMyVisualData extends IVisualData {
  coords: Float32Array;
}

export default class MyCanvas2DStyle implements IVisualStyle<CanvasRenderingContext2D, IMyVisualData> {
  constructor(private _graphics: Graphic[]) {
  }

  async load(query: IVisualQuery): Promise<IMyVisualData> {
    const filtered = this._graphics.filter((graphic) => graphic.geometry.type === "point" && query.extent.intersects(graphic.geometry));
    const coords = new Float32Array(filtered.length * 2);
    let i = 0;
    for (const graphic of filtered) {
      coords[i++] = (graphic.geometry as Point).x;
      coords[i++] = (graphic.geometry as Point).y;
    }
    return { coords };
  }
  
  render(ctx: CanvasRenderingContext2D, state: IVisualState, data: IMyVisualData): void {
    ctx.translate(state.position[0], state.position[1]);
    ctx.rotate(state.rotation);
    ctx.scale(state.scale, state.scale);

    for (let i = 0; i < data.coords.length; i += 2) {
      const x = data.coords[i];
      defined(x);
      const y = data.coords[i];
      defined(y);

      ctx.fillStyle = "red";
      ctx.fillRect(x - 3, y - 3, 6, 6);
      ctx.strokeStyle = "blue";
      ctx.strokeRect(x - 3, y - 3, 6, 6);
    }
  }
}



