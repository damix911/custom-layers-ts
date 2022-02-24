import MapView from "@arcgis/core/views/MapView";
import BaseLayerViewGL2D from "@arcgis/core/views/2d/layers/BaseLayerViewGL2D";
import Layer from "@arcgis/core/layers/Layer";
import { subclass, property } from "@arcgis/core/core/accessorSupport/decorators";
import Graphic from "@arcgis/core/Graphic";
import { watch } from "@arcgis/core/core/reactiveUtils";
import MyWebGLStyle from "../styles/MyWebGLStyle";
import { IVisualState } from "../interfaces";

@subclass("layers.MyWebGLLayerView2D")
class MyWebGLLayerView2D extends BaseLayerViewGL2D {
  private _handle: IHandle | null = null;
  private _style: MyWebGLStyle | null = null;

  constructor(properties: { layer: Layer, view: MapView }) {
    super(properties);
  }

  override attach(): void {
    this._handle = watch(() => (this.layer as any).graphics, (value) => {
      this._style = new MyWebGLStyle(value)
    });
  }

  override render(renderParameters: any): void {
    const { context: gl } = renderParameters;

    if (!this._style) {
      return;
    }

    const visualState: IVisualState = {
      translation: [0, 0],
      rotation: 0,
      scale: 1,
      size: renderParameters.state.size
    };

    this._style.render(gl, visualState, null as any);
  }

  override detach(): void {
    if (this._handle) {
      this._handle.remove();
      this._handle = null;
    }
  }
}

@subclass("layers.MyWebGLLayer")
export default class MyWebGLLayer extends Layer {
  override async createLayerView(view: any): Promise<__esri.LayerView> {
    return new MyWebGLLayerView2D({ layer: this, view });
  }

  @property()
  graphics: Graphic[] = [];
}
