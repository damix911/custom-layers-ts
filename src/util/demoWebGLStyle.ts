import { IVisualData, IVisualStyle } from "../interfaces";
import { defined } from "./assert";
import demoStyle from "./demoStyle";

export default function demoWebGLStyle<D extends IVisualData>(style: IVisualStyle<WebGLRenderingContext, D>): void {
  function createContext(): WebGLRenderingContext {
    const canvas = document.createElement("canvas");
    canvas.style.border = "1px solid black";
    canvas.width = 640;
    canvas.height = 360;
    document.body.appendChild(canvas);
    const gl = canvas.getContext("webgl");
    defined(gl);
    return gl;
  }

  function preRender(gl: WebGLRenderingContext): void {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  demoStyle(style, createContext, preRender)
}
