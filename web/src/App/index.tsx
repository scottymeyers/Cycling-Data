import React, { useRef, useState, useEffect } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';
import * as config from 'config';
import activities from 'activities.json';

const App: React.FC = () => {
  const [map, setMap] = useState();
  const mapOptions = useRef<google.maps.MapOptions>({
    center: { lat: 40.699, lng: -73.976 },
    clickableIcons: false,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    draggableCursor: 'arrow',
    minZoom: 10,
    maxZoom: 16,
    panControl: false,
    scrollwheel: true,
    styles: config.mapStyles,
    zoom: 14,
  });

  useEffect(() => {
    activities.map((route) => map?.data.addGeoJson(route));
    map?.data.setStyle({
      strokeColor: '#000000',
      strokeWidth: 2,
    });
  }, [map]);

  return (
    <LoadScript
      googleMapsApiKey={config.apiKey}
      libraries={config.mapLibraries}
      loadingElement={<></>}
    >
      <GoogleMap id="map" options={mapOptions.current} onLoad={setMap} />
    </LoadScript>
  );
};

export default App;
