import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";

export default function createDemoGraphics(): Graphic[] {
  const graphic1 = new Graphic({
    geometry: new Point({
      x: -100,
      y: 40,
      spatialReference: {
        wkid: 4326
      }
    })
  });

  const graphic2 = new Graphic({
    geometry: new Point({
      x: -105,
      y: 40,
      spatialReference: {
        wkid: 4326
      }
    })
  });

  const graphic3 = new Graphic({
    geometry: new Point({
      x: -95,
      y: 35,
      spatialReference: {
        wkid: 4326
      }
    })
  });

  return [graphic1, graphic2, graphic3];
}