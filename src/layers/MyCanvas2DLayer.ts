import MapView from "@arcgis/core/views/MapView";
import BaseLayerView2D from "@arcgis/core/views/2d/layers/BaseLayerView2D";
import Layer from "@arcgis/core/layers/Layer";
import { subclass, property } from "@arcgis/core/core/accessorSupport/decorators";
import Graphic from "@arcgis/core/Graphic";
import { watch } from "@arcgis/core/core/reactiveUtils";
import { IQuery, IState } from "../interfaces";
import Extent from "@arcgis/core/geometry/Extent";
import MyCanvas2DPainter from "../painters/MyCanvas2DPainter";

@subclass("layers.MyCanvas2DLayerView")
class MyCanvas2DLayerView extends BaseLayerView2D {
  private _handle: IHandle | null = null;
  private _painter: MyCanvas2DPainter | null = null;
  private _data: any = null;

  constructor(properties: { layer: Layer, view: MapView }) {
    super(properties);
  }

  override attach(): void {
    this._handle = watch(() => (this.layer as MyCanvas2DLayer).graphics, (value) => {
      this._painter = new MyCanvas2DPainter(value);

      // TODO! Real extent and life cycle.
      const resolution = 10000;
      const extent = new Extent({
        xmin: -11131949.08 - 0.5 * 640 * resolution,
        ymin: 4865942.28 - 0.5 * 360 * resolution,
        xmax: -11131949.08 + 0.5 * 640 * resolution,
        ymax: 4865942.28 + 0.5 * 360 * resolution,
        spatialReference: {
          wkid: 3857
        }
      });
      const size: [number, number] = [640, 360];
      const query: IQuery = {
        extent,
        size,
        pixelRatio: 1
      };
      this._painter.load(query).then((d) => {
        this._data = d;
      });
    }, { initial: true });
  }

  override render(renderParameters: any): void {
    const { context: ctx } = renderParameters;

    if (!this._painter || !this._data) {
      return;
    }

    const visualState: IState = {
      position: [0, 0],
      rotation: 0,
      scale: 1,
      size: renderParameters.state.size,
      pixelRatio: 1 // TODO
    };

    this._painter.render(ctx, visualState, this._data);
  }

  override detach(): void {
    if (this._handle) {
      this._handle.remove();
      this._handle = null;
    }
  }
}

@subclass("layers.MyCanvas2DLayer")
export default class MyCanvas2DLayer extends Layer {
  override async createLayerView(view: __esri.MapView): Promise<__esri.LayerView> {
    return new MyCanvas2DLayerView({ layer: this, view });
  }

  @property()
  graphics: Graphic[] = [];
}
