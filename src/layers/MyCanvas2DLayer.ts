import MapView from "@arcgis/core/views/MapView";
import BaseLayerView2D from "@arcgis/core/views/2d/layers/BaseLayerView2D";
import Layer from "@arcgis/core/layers/Layer";
import { subclass, property } from "@arcgis/core/core/accessorSupport/decorators";
import Graphic from "@arcgis/core/Graphic";
import { watch } from "@arcgis/core/core/reactiveUtils";
import MyCanvas2DStyle from "../styles/MyCanvas2DStyle";
import { IVisualQuery, IVisualState } from "../interfaces";
import Extent from "@arcgis/core/geometry/Extent";

@subclass("layers.MyCanvas2DLayerView")
class MyCanvas2DLayerView extends BaseLayerView2D {
  private _handle: IHandle | null = null;
  private _style: MyCanvas2DStyle | null = null;
  private _data: any = null;

  constructor(properties: { layer: Layer, view: MapView }) {
    super(properties);
  }

  override attach(): void {
    this._handle = watch(() => (this.layer as any).graphics, (value) => {
      this._style = new MyCanvas2DStyle(value);

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
      const query: IVisualQuery = {
        extent,
        size,
        pixelRatio: 1
      };
      this._style.load(query).then((d) => {
        this._data = d;
      });
    }, { initial: true });
  }

  override render(renderParameters: any): void {
    const { context: ctx } = renderParameters;

    if (!this._style || !this._data) {
      return;
    }

    const visualState: IVisualState = {
      position: [0, 0],
      rotation: 0,
      scale: 1,
      size: renderParameters.state.size
    };

    this._style.render(ctx, visualState, this._data);
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
  override async createLayerView(view: any): Promise<__esri.LayerView> {
    return new MyCanvas2DLayerView({ layer: this, view });
  }

  @property()
  graphics: Graphic[] = [];
}
