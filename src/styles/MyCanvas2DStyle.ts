import Graphic from "@arcgis/core/Graphic";
import { IQuery, IVisualData, IVisualState, ICanvas2DStyle } from "../interfaces";

class MyCanvas2DData implements IVisualData {
  destroy(): void {
  }
}

export default class MyCanvas2DStyle implements ICanvas2DStyle<MyCanvas2DData> {
  constructor(private _graphics: Graphic[]) {
    console.log(this._graphics);
  }

  async load(_query: IQuery): Promise<MyCanvas2DData> {
    return new MyCanvas2DData();
  }
  
  render(ctx: CanvasRenderingContext2D, state: IVisualState, _data: MyCanvas2DData): void {
    ctx.resetTransform();
    ctx.translate(state.translation[0], state.translation[1]);
    ctx.rotate(state.rotation);
    ctx.scale(state.scale, state.scale);
    
    ctx.fillStyle = "red";
    ctx.fillRect(200 - 4, 100 - 4, 8, 8);

    // const screenPoint: [number, number] = [0, 0];
    
    // for (const graphic of (this.layer as any).graphics) {
    //   const { geometry } = graphic;
    //   renderParameters.state.toScreen(screenPoint, [geometry.x, geometry.y]);
    //   context.fillStyle = "red";
    //   context.fillRect(screenPoint[0] - 4, screenPoint[1] - 4, 8, 8);
    // }
  }
}



