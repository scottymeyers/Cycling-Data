const fs = require('fs');
const togeojson = require('@mapbox/togeojson');
const xmldom = require('xmldom');

const { readdir, readFileSync, writeFile } = fs;
const DOMParser = xmldom.DOMParser;

const activities = [];
let count = 0;

readdir('./gpx', (error, files) => {
  count = files.length;

  console.log(`Starting conversion of ${count} GPX files...`);

  files.forEach((file) => {
    console.log(`Converting ${count} GPX files...`);
    if (file.endsWith('gpx')) {
      const gpx = new DOMParser().parseFromString(readFileSync(`./gpx/${file}`, 'utf8'));
      const convertedWithStyles = togeojson.gpx(gpx, { styles: true });
      convertedWithStyles.features.forEach((feature) => {
        if (feature.properties.type === '1') {
          activities.push(convertedWithStyles);
        }
      });
    }
    count--;
  });
  writeFile('./activities.json', JSON.stringify(activities), 'utf8', () => console.log('Finished'));
});