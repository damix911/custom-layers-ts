import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import { IQuery, IState, IPainter, IData } from "../interfaces";
import { defined } from "../util/assert";
import quantizeGraphics from "../util/quantizeGraphics";

interface IMyData extends IData {
  coords: Float32Array;
}

export default class MyCanvas2DPainter implements IPainter<CanvasRenderingContext2D, IMyData> {
  constructor(private _graphics: Graphic[]) {
  }

  async load(query: IQuery): Promise<IMyData> {
    const quantized = await quantizeGraphics(this._graphics, query.extent, query.size);
    const coords = new Float32Array(quantized.length * 2);
    
    let i = 0;
    
    for (const graphic of quantized) {
      coords[i++] = (graphic.geometry as Point).x;
      coords[i++] = (graphic.geometry as Point).y;
    }

    return { coords };
  }

  render(ctx: CanvasRenderingContext2D, state: IState, data: IMyData): void {
    ctx.translate(state.position[0], state.position[1]);
    ctx.rotate(state.rotation);
    ctx.scale(state.scale, state.scale);

    for (let i = 0; i < data.coords.length; i += 2) {
      const x = data.coords[i];
      defined(x);
      const y = data.coords[i + 1];
      defined(y);

      ctx.fillStyle = "red";
      ctx.fillRect(x - 3, y - 3, 6, 6);
      ctx.strokeStyle = "blue";
      ctx.strokeRect(x - 3, y - 3, 6, 6);
    }
  }
}



