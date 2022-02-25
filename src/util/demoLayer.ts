import EsriMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Layer from "@arcgis/core/layers/Layer";

export default async function demoLayer(layer: Layer): Promise<void> {
  const container = document.createElement("div");
  container.id = "viewDiv";
  document.body.appendChild(container);

  const map = new EsriMap({
    basemap: "streets-night-vector",
    layers: [layer]
  });
  
  new MapView({
    container,
    map: map,
    center: [-100, 40],
    zoom: 3
  });
}
