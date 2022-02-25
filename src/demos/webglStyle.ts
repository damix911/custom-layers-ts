import Graphic from "@arcgis/core/Graphic";
import MyWebGLStyle from "../styles/MyWebGLStyle";
import { IQuery, IVisualState } from "../interfaces";
import Extent from "@arcgis/core/geometry/Extent";

export default async function (): Promise<void> {
  const viewDiv = document.getElementById("viewDiv")!;
  const canvas = document.createElement("canvas");
  canvas.style.border = "1px solid black";
  canvas.width = 640;
  canvas.height = 360;
  viewDiv.appendChild(canvas);
  const gl = canvas.getContext("webgl")!;

  const resolution = 10000;
  const extent = new Extent({
    xmin: -0.5 * canvas.width * resolution,
    xmax: +0.5 * canvas.width * resolution,
    ymin: -0.5 * canvas.height * resolution,
    ymax: +0.5 * canvas.height * resolution,
    spatialReference: {
      wkid: 3857
    }
  });
  const size: [number, number] = [canvas.width, canvas.height];
  const query: IQuery = {
    extent,
    size,
    pixelRatio: 1
  };

  const graphics: Graphic[] = [];
  const style = new MyWebGLStyle(graphics);

  const data = await style.load(query);

  function render(): void {
    const time = performance.now() / 1000;

    const state: IVisualState = {
      translation: [50 * Math.sin(0.2 * time), 30 * Math.sin(0.3 * time)],
      rotation: 0.3 * Math.sin(0.5 * time),
      scale: 1 + 0.2 * Math.sin(0.8 * time),
      size
    };
  
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    style.render(gl, state, data);
  }

  function frame(): void {
    render();
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}