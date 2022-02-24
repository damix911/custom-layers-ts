import EsriMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import BaseLayerViewGL2D from "@arcgis/core/views/2d/layers/BaseLayerViewGL2D";
import Layer from "@arcgis/core/layers/Layer";
import { subclass, property } from "@arcgis/core/core/accessorSupport/decorators";
import Graphic from "@arcgis/core/Graphic";
// import { watch } from "@arcgis/core/core/reactiveUtils";

@subclass("demos.canvas2d.markers.MyLayerView2D")
class MyLayerView2D extends BaseLayerViewGL2D {
  constructor(properties: { layer: Layer, view: MapView }) {
    super(properties);
  }

  override attach(): void {
    // watch(() => (this.layer as any).points, () => {

    // });
  }

  override render(renderParameters: any): void {
    const { context: gl } = renderParameters;
    gl.enable(gl.SCISSOR_TEST);
    gl.clearColor(0, 1, 0, 1);

    const screenPoint: [number, number] = [0, 0];

    for (const graphic of (this.layer as any).graphics) {
      const { geometry } = graphic;
      renderParameters.state.toScreen(screenPoint, [geometry.x, geometry.y]);
      gl.scissor(screenPoint[0] - 4, renderParameters.state.size[1] - screenPoint[1] - 4, 8, 8);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
  }
}

@subclass("demos.canvas2d.markers.MyLayer")
class MyLayer extends Layer {
  override async createLayerView(view: any): Promise<__esri.LayerView> {
    return new MyLayerView2D({ layer: this, view });
  }

  @property()
  graphics: Graphic[] = [];
}

export default function (): void {
  const layer = new MyLayer();

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