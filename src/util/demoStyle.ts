import { IVisualQuery, IVisualState, IVisualStyle } from "../interfaces";
import Extent from "@arcgis/core/geometry/Extent";

export default async function demoStyle<C, D>(style: IVisualStyle<C, D>, createContext: (width: number, height: number) => C, preRender: (context: C) => void): Promise<void> {
  const width = 640;
  const height = 360;
  const context = createContext(width, height);

  const resolution = 10000;
  const extent = new Extent({
    xmin: -0.5 * width * resolution,
    xmax: +0.5 * width * resolution,
    ymin: -0.5 * height * resolution,
    ymax: +0.5 * height * resolution,
    spatialReference: {
      wkid: 3857
    }
  });
  const size: [number, number] = [width, height];
  const query: IVisualQuery = {
    extent,
    size,
    pixelRatio: 1
  };

  const data = await style.load(query);

  function render(): void {
    const time = performance.now() / 1000;
    const s = 0.3 * time;
    const phase = Math.floor(s) % 4;
    const cycle = 2 * Math.PI * (s - Math.floor(s));

    let position: [number, number] = [0, 0];
    let rotation = 0;
    let scale = 1;

    switch (phase) {
      case 0:
        position[0] = 100 * Math.sin(cycle);
        break;
      case 1:
        position[1] = 100 * Math.sin(cycle);
        break;
      case 2:
        rotation = Math.sin(cycle);
        break;
      case 3:
        scale = 1 + 0.5 * Math.sin(cycle);
        break;
    }

    const state: IVisualState = {
      position,
      rotation,
      scale,
      size
    };
  
    preRender(context);
    style.render(context, state, data);
  }

  function frame(): void {
    render();
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}