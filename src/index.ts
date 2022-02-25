import canvas2dPainter from "./demos/canvas2dPainter";
import webglPainter from "./demos/webglPainter";
import canvas2dLayer from "./demos/canvas2dLayer";
import webglLayer from "./demos/webglLayer";

const demos = {
  canvas2dPainter,
  webglPainter,
  canvas2dLayer,
  webglLayer
};

const params = new URLSearchParams(window.location.search);
const demo = params.get("demo") as keyof typeof demos;

const entryPoint = demos[demo];

entryPoint();
