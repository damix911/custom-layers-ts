import MyCanvas2DLayer from "../layers/MyCanvas2DLayer";
import createDemoGraphics from "../util/createDemoGraphics";
import demoLayer from "../util/demoLayer";

export default function (): void {
  const layer = new MyCanvas2DLayer();
  layer.graphics = createDemoGraphics();
  demoLayer(layer);
}