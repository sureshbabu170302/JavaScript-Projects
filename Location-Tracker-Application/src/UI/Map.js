export class Map {
  constructor(coords) {
    this.render(coords);
  }
  render(coordinates) {
    document.getElementById("map").innerHTML = ""; // clear the <p> in the <div id="map">

    const map = new ol.Map({
      target: "map",
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([coordinates.lng, coordinates.lat]),
        zoom: 16,
      }),
    });
    const layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [
          new ol.Feature({
            geometry: new ol.geom.Point(
              ol.proj.fromLonLat([coordinates.lng, coordinates.lat])
            ),
          }),
        ],
      }),
    });
    map.addLayer(layer);
  }
}
