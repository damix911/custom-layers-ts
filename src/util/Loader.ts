import { IData, IPainter } from "../interfaces";

export default class Loader<C, D extends IData> {
  private _loadingPainter: IPainter<C, D> | null = null;
  private _abortController: AbortController | null = null;
  private _loadedPainter: IPainter<C, D> | null = null;
  private _loadedData: D | null = null;

  invalidate(): void {
    
  }

  set painter(): IPainter<C, D> | null {
    // TODO. Compatibility and resource update.
  }

  get data(): D | null {
    return this._loadedData;
  }

  destroy(): void {
    if (this._abortController) {
      this._abortController.abort();
      this._abortController = null;
    }

    this._loadingPainter = null;

    if (this._loadedData) {
      this._loadedData.unload?.();
      this._loadedData = null;
    }

    this._loadedPainter = null;
  }
}