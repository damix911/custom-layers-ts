import EsriMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import BaseLayerView2D from "@arcgis/core/views/2d/layers/BaseLayerView2D";
import Layer from "@arcgis/core/layers/Layer";
import { subclass } from "@arcgis/core/core/accessorSupport/decorators";

@subclass("demos.canvas2d.markers.MarkersLayerView2D")
class MarkersLayerView2D extends BaseLayerView2D {
  constructor(properties: { layer: Layer, view: MapView }) {
    super(properties);
  }

  override render(renderParameters: any): void {
    const { context } = renderParameters;

    context.fillRect(200, 100, 60, 20);
  }
}

@subclass("demos.canvas2d.markers.MarkersLayer")
class MarkersLayer extends Layer {
  override async createLayerView(view: any): Promise<__esri.LayerView> {
    return new MarkersLayerView2D({ layer: this, view });
  }
}

export default function (): void {
  const layer = new MarkersLayer();

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

  console.log(view);
}