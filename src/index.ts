import canvas2dStyle from "./demos/canvas2dStyle";
import webglStyle from "./demos/webglStyle";
import canvas2dLayer from "./demos/canvas2dLayer";
import webglLayer from "./demos/webglLayer";

const demos = {
  canvas2dStyle,
  webglStyle,
  canvas2dLayer,
  webglLayer
};

const params = new URLSearchParams(window.location.search);
const demo = params.get("demo") as keyof typeof demos;

const entryPoint = demos[demo];

entryPoint();