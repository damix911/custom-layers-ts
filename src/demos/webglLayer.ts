import MyWebGLLayer from "../layers/MyWebGLLayer";
import demoLayer from "../util/demoLayer";

export default function (): void {
  const layer = new MyWebGLLayer();
  demoLayer(layer);
}