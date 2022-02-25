import { IVisualData, IVisualStyle } from "../interfaces";
import { defined } from "./assert";
import demoStyle from "./demoStyle";

export default function demoCanvas2DStyle<D extends IVisualData>(style: IVisualStyle<CanvasRenderingContext2D, D>): void {
  function createContext(): CanvasRenderingContext2D {
    const canvas = document.createElement("canvas");
    canvas.style.border = "1px solid black";
    canvas.width = 640;
    canvas.height = 360;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    defined(ctx);
    return ctx;
  }

  function preRender(ctx: CanvasRenderingContext2D): void {
    ctx.resetTransform();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  demoStyle(style, createContext, preRender)
}
