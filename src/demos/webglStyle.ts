import MyWebGLStyle from "../styles/MyWebGLStyle";
import createDemoGraphics from "../util/createDemoGraphics";
import demoWebGLStyle from "../util/demoWebGLStyle";

export default function (): void {
  const graphics = createDemoGraphics();
  const style = new MyWebGLStyle(graphics);
  demoWebGLStyle(style);
}