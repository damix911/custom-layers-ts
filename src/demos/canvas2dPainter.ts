
import MyCanvas2DPainter from "../painters/MyCanvas2DPainter";
import createDemoGraphics from "../util/createDemoGraphics";
import demoCanvas2DPainter from "../util/demoCanvas2DPainter";

export default function (): void {
  const graphics = createDemoGraphics();
  const painter = new MyCanvas2DPainter(graphics);
  demoCanvas2DPainter(painter);
}