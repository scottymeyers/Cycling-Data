import togeojson  from '@mapbox/togeojson';
import { readdir, readFileSync, writeFile } from 'fs';
import xmldom from 'xmldom';

// node doesn't have xml parsing or a dom. use xmldom
const DOMParser = xmldom.DOMParser;

const activities = [];

readdir('./gpx', (error, files) => {
  files.forEach((file, index) => {
    if (file.endsWith('gpx')) {
      const gpx = new DOMParser().parseFromString(readFileSync(`./gpx/${file}`, 'utf8'));
      const converted = togeojson.gpx(gpx);
      const convertedWithStyles = togeojson.gpx(gpx, { styles: true });
      convertedWithStyles.features.forEach((feature) => activities.push(feature.geometry.coordinates));
    }
  });
  writeFile('./activities.json', JSON.stringify(activities), 'utf8', () => console.log('Completed'));
});