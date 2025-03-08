import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Map = ({ map_height, map_center }) => {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const INITIAL_CENTER = [-123.25470, 49.26550];
  const INITIAL_ZOOM = 16.4;
  const INITIAL_PITCH = 60;

  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [pitch, setPitch] = useState(45);

  useEffect(() => {
    if (mapContainerRef.current) {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZGFyaXVzYWxleGFuZGVyIiwiYSI6ImNtN3R4YmFneTB1M3Yya3BxNHJwdmI2anMifQ.Ow88-dYPaWdwqkbs9fT76Q';
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: map_center,
        style: 'mapbox://styles/dariusalexander/cm7u0s6dp00db01sv2oed8m0u',
        zoom: INITIAL_ZOOM,
        pitch: INITIAL_PITCH,
      });

      mapRef.current.on('load', () => {
        console.log('Map loaded');

        // Add a source and layer for your features
        if (!mapRef.current.getSource('campus-friends')) {
          mapRef.current.addSource('campus-friends', {
            type: 'geojson',
            data: './style.geojson', // replace with the path to your GeoJSON data
          });
        }

        if (!mapRef.current.getLayer('campus-friends')) {
          mapRef.current.addLayer({
            id: 'campus-friends',
            type: 'symbol',
            source: 'campus-friends',
            layout: {
              'icon-image': 'marker-15', // replace with your icon
              'text-field': ['get', 'title'],
              'text-offset': [0, 1.25],
              'text-anchor': 'top',
            },
          });
        }

        // Verify that the source and layer are added
        console.log('Source and layer added');
      });

      mapRef.current.on('click', (event) => {
        console.log('Map clicked at:', event.point);

        // If the user clicked on one of your markers, get its information.
        const features = mapRef.current.queryRenderedFeatures(event.point, {
          layers: ['campus-friends'], // replace with your layer name
        });

        if (!features.length) {
          console.log('No features found at clicked point');
          return;
        }
        const feature = features[0];

        console.log('Feature found:', feature);

        if (!feature.properties.title || !feature.properties.description) {
          console.log('Feature properties missing:', feature.properties);
          return;
        }

        const popup = new mapboxgl.Popup({ offset: [0, -15] })
          .setLngLat(feature.geometry.coordinates)
          .setHTML(
            `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
          )
          .addTo(mapRef.current);
      });

      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserLocation: true,
      });

      mapRef.current.addControl(geolocateControl);
      mapRef.current.on('move', () => {
        // get the current center coordinates and zoom level from the map
        const mapCenter = mapRef.current.getCenter();
        const mapZoom = mapRef.current.getZoom();
        const mapPitch = mapRef.current.getPitch();

        // update state
        setCenter([mapCenter.lng, mapCenter.lat]);
        setZoom(mapZoom);
        setPitch(mapPitch);
      });

      return () => {
        mapRef.current.off('click');
        mapRef.current.remove();
      };
    }
  }, [map_center]);

  const handleButtonClick = () => {
    console.log('Button clicked');
    mapRef.current.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      pitch: INITIAL_PITCH,
    });
  };

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>

      <div style={{ height: map_height }} id="map-container" ref={mapContainerRef}></div>
      <Button style={{position: 'absolute', marginTop: '1rem'}} onClick={handleButtonClick} variant="contained">Reset Map</Button>
    </Box>

  );
}

export default Map;