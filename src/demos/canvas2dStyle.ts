import MyCanvas2DStyle from "../styles/MyCanvas2DStyle";
import createDemoGraphics from "../util/createDemoGraphics";
import demoCanvas2DStyle from "../util/demoCanvas2DStyle";

export default function (): void {
  const graphics = createDemoGraphics();
  const style = new MyCanvas2DStyle(graphics);
  demoCanvas2DStyle(style);
}