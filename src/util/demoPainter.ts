import { IQuery, IState, IPainter } from "../interfaces";
import Extent from "@arcgis/core/geometry/Extent";

export default async function demoPainter<C, D>(painter: IPainter<C, D>, createContext: (width: number, height: number) => C, preRender: (context: C) => void): Promise<void> {
  const width = 640;
  const height = 360;
  const context = createContext(width, height);

  const resolution = 10000;
  const extent = new Extent({
    xmin: -11131949.08 - 0.5 * width * resolution,
    ymin: 4865942.28 - 0.5 * height * resolution,
    xmax: -11131949.08 + 0.5 * width * resolution,
    ymax: 4865942.28 + 0.5 * height * resolution,
    spatialReference: {
      wkid: 3857
    }
  });
  const size: [number, number] = [width, height];
  const pixelRatio = 1;
  const query: IQuery = {
    extent,
    size,
    pixelRatio
  };
  
  const data = await painter.load(query);

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
        rotation = 0.2 * Math.sin(cycle);
        break;
      case 3:
        scale = 1 + 0.5 * Math.sin(cycle);
        break;
    }

    const state: IState = {
      position,
      rotation,
      scale,
      size,
      pixelRatio
    };
  
    preRender(context);
    painter.render(context, state, data);
  }

  function frame(): void {
    render();
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}
