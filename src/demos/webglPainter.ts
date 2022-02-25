
import MyWebGLPainter from "../painters/MyWebGLPainter";
import createDemoGraphics from "../util/createDemoGraphics";
import demoWebGLPainter from "../util/demoWebGLPainter";

export default function (): void {
  const graphics = createDemoGraphics();
  const painter = new MyWebGLPainter(graphics);
  demoWebGLPainter(painter);
}