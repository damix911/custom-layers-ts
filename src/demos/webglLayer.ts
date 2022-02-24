import EsriMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import MyWebGLLayer from "../layers/MyWebGLLayer";
import Graphic from "@arcgis/core/Graphic";

export default function (): void {
  const layer = new MyWebGLLayer();

  const map = new EsriMap({
    basemap: "streets-night-vector",
    layers: [layer]
  });
  
  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-100, 40],
    zoom: 3
  });

  view.on("click", (evt) => {
    const graphic = new Graphic({
      geometry: evt.mapPoint
    });
    layer.graphics = layer.graphics.concat([graphic]);
  });
}