import Graphic from "@arcgis/core/Graphic";
import { IQuery, IRenderState, IPainter } from "../interfaces";

interface IMyData {
}

export default class MyWebGLPainter implements IPainter<WebGLRenderingContext, IMyData> {
  constructor(private _graphics: Graphic[]) {
    // TODO. Remove this.
    console.log(this._graphics);
  }

  async load(_query: IQuery): Promise<IMyData> {
    return {};
  }

  render(gl: WebGLRenderingContext, state: IRenderState, _data: IMyData): void {
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