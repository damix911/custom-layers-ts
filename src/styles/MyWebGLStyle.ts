import Graphic from "@arcgis/core/Graphic";
import { IVisualQuery, IVisualData, IVisualState, IVisualStyle } from "../interfaces";

class MyWebGLData implements IVisualData {
  destroy(): void {
  }
}

export default class MyWebGLStyle implements IVisualStyle<WebGLRenderingContext, MyWebGLData> {
  constructor(private _graphics: Graphic[]) {
    console.log(this._graphics);
  }

  async load(_query: IVisualQuery): Promise<MyWebGLData> {
    return new MyWebGLData();
  }
  
  render(gl: WebGLRenderingContext, state: IVisualState, _data: MyWebGLData): void {
    gl.enable(gl.SCISSOR_TEST);
    gl.clearColor(0, 1, 0, 1);

    gl.scissor(200 - 4, state.size[1] - 100 - 4, 8, 8);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // const screenPoint: [number, number] = [0, 0];

    // for (const graphic of this._graphics) {
    //   const { geometry } = graphic;
    //   renderParameters.state.toScreen(screenPoint, [geometry.x, geometry.y]);
    //   gl.scissor(screenPoint[0] - 4, renderParameters.state.size[1] - screenPoint[1] - 4, 8, 8);
    //   gl.clear(gl.COLOR_BUFFER_BIT);
    // }
  }
}