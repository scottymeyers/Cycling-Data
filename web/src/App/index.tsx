import React, { useRef, useState, useEffect } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';
import { FeatureCollection } from 'geojson';
import * as config from 'config';
import * as activities from 'activities.json';

const App: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapOptions = useRef<google.maps.MapOptions>({
    center: { lat: 40.699, lng: -73.99 },
    clickableIcons: false,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    draggableCursor: 'arrow',
    minZoom: 10,
    maxZoom: 16,
    panControl: false,
    scrollwheel: true,
    styles: config.mapStyles,
    zoom: 12,
  });

  const parsedActivities = JSON.parse(JSON.stringify(activities));
  const data: FeatureCollection[] = parsedActivities.default;

  useEffect(() => {
    if (!map) return;
    data.map((route: FeatureCollection) => map.data.addGeoJson(route));
    map.data.setStyle({
      strokeColor: '#000000',
      strokeWeight: 2,
    });
  }, [data, map]);

  if (!config.apiKey) return null;
  return (
    <LoadScript
      googleMapsApiKey={config.apiKey}
      libraries={['places', 'drawing', 'geometry']}
      loadingElement={<></>}
    >
      <GoogleMap id="map" options={mapOptions.current} onLoad={setMap} />
    </LoadScript>
  );
};

export default App;
