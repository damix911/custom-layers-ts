import MyWebGLLayer from "../layers/MyWebGLLayer";
import createDemoGraphics from "../util/createDemoGraphics";
import demoLayer from "../util/demoLayer";

export default function (): void {
  const layer = new MyWebGLLayer();
  layer.graphics = createDemoGraphics();
  demoLayer(layer);
}