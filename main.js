import './style.css';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ImageLayer from 'ol/layer/Image';
import ImageStatic from 'ol/source/ImageStatic';
import { fromLonLat } from 'ol/proj';
import { getCenter } from 'ol/extent';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

// Define the extent of the image in map coordinates
const imageExtent = fromLonLat([77.1025, 28.7041]);
const imageCoordinate = fromLonLat([77.1025, 28.7041]);
const iconFeature = new Feature({
    geometry: new Point(imageCoordinate),
  });

  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: '/farmer.png',
      scale: 0.1  // Adjust the scale as needed
    })
  });

  iconFeature.setStyle(iconStyle);

  const vectorSource = new VectorSource({
    features: [iconFeature],
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });
// Create a new map
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    vectorLayer
    // new ImageLayer({
    //   source: new ImageStatic({
    //     url: 'farmer.png',
    //     imageExtent: [
    //       imageExtent[0] - 5000, imageExtent[1] - 5000, // Bottom-left
    //       imageExtent[0] + 5000, imageExtent[1] + 5000  // Top-right
    //     ],
    //   }),
    // })
  ],
  view: new View({
    center: imageExtent, // Center the view on the image location
    zoom: 5
  })
});

// Log the view center to the console
console.log(map.getView().getCenter());
