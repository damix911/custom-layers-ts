import canvas2d from "./demos/canvas2d";
import webgl from "./demos/webgl";

const demos = {
  canvas2d,
  webgl
};

const params = new URLSearchParams(window.location.search);
const demo = params.get("demo") as keyof typeof demos;

const entryPoint = demos[demo];

entryPoint();