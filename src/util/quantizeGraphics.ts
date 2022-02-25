import Graphic from "@arcgis/core/Graphic";
import * as projection from "@arcgis/core/geometry/projection";
import Extent from "@arcgis/core/geometry/Extent";
import Point from "@arcgis/core/geometry/Point";

export default async function quantizeGraphics(graphics: Graphic[], extent: Extent, size: [number, number]): Promise<Graphic[]> {
  await projection.load();

  const projected: Graphic[] = [];

  for (const graphic of graphics) {
    let projectedGeometries = projection.project(graphic.geometry, extent.spatialReference);
    projectedGeometries = Array.isArray(projectedGeometries) ? projectedGeometries : [projectedGeometries];

    for (const projectedGeometry of projectedGeometries) {
      if (extent.intersects(projectedGeometry)) {
        // TODO: All geometry types.
        const point = projectedGeometry as Point;
        const x = size[0] * (point.x - extent.xmin) / (extent.xmax - extent.xmin);
        const y = size[1] * (1 - (point.y - extent.ymin) / (extent.ymax - extent.ymin));
        const quantizedGeometry = new Point({
          x,
          y
        });

        projected.push(new Graphic({
          geometry: quantizedGeometry
        }));
      }
    }
  }
  
  return projected;
}
