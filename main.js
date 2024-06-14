import './style.css';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import { Heatmap as HeatmapLayer } from 'ol/layer';

// GeoJSON input
const input = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [74.40206638280921, 22.37868130705212],
          [74.76218793901796, 22.016734890589888],
          [77.72280972804981, 18.14881898278645],
          [82.7953089286139, 19.87914788034307],
          [86.26559027981261, 23.661148994956008],
          [82.55133426094892, 25.91358321899449],
          [80.61833150030918, 27.342332051466784],
          [74.22748644474726, 23.702998600936724],
          [73.70565841704985, 26.312939244794094],
          [70.08981366133054, 23.079563769983025],
          [74.01538956086972, 21.795708640822426],
          [74.45696626633168, 22.395271775126957]
        ],
        "type": "LineString"
      }
    }
  ]
};

// Convert the input coordinates to the map's projection
const features = new GeoJSON().readFeatures(input, {
  featureProjection: 'EPSG:3857'
});

const vectorSource = new VectorSource({
  features: features
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: new Style({
    stroke: new Stroke({
      color: '#ff0000',
      width: 5,
    }),
  }),
});

// Assuming 'police.geojson' is the URL to your GeoJSON data for the heatmap
const heatmapSource = new VectorSource({
  url: 'police.geojson',
  format: new GeoJSON(),
});

const heatmapLayer = new HeatmapLayer({
  source: heatmapSource,
  gradient: ['#ff00ff', '#00ff00', '#ffffff', '#000000']
});

// Create a new map
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM({
        wrapX: false
      })
    }),
    vectorLayer,
    heatmapLayer
  ],
  view: new View({
    center: fromLonLat([77.1025, 28.7041]), 
    zoom: 5
  })
});

console.log(map.getView().getCenter());
