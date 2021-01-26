import React, { useRef, useEffect } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import {getAddress, getPoints} from '../Utils/ApiUils';
import './Map.css';

function Map (props) {
  const {
    lat,
    lng,
    zoom,
    basemapURL,
    requestPoint,
  } = props;

  let username = '';
  let apiKey = '';
  let tableName = '';
  if (process && process.env) {
    if(process.env.REACT_APP_USERNAME) {
      username = process.env.REACT_APP_USERNAME;
    }
    if(process.env.REACT_APP_API_KEY) {
      apiKey = process.env.REACT_APP_API_KEY;
    }
    if(process.env.REACT_APP_TABLE_NAME) {
      tableName = process.env.REACT_APP_TABLE_NAME;
    }
  }

  const map = useRef(null);

  requestPoint.current = async () => {
    const {pointsLayer, pointsMeta} = await createPointsLayer();
    const popup = L.popup({ closeButton: true });
    let i = 0;
    pointsLayer.addTo(map.current);

    pointsLayer.eachLayer( point=> {
      let type = pointsMeta[i]
      point.on('click', async e => {
        const {lat, lng} = e.latlng
        let direction = await getAddress(lat, lng);
        let htmlContent;
        htmlContent = makeMarkupOnePoint(lat, lng, type, direction);
        popup.setContent(htmlContent);
        popup.setLatLng(e.latlng);
        if (!popup.isOpen()) {
          popup.openOn(map.current);
        }
      });
      i++;
    });
  };


  useEffect(() => {
    if (map.current !== null) {
      map.current.remove();
    }
    map.current = L.map('map', {
      center: [lat, lng],
      zoom,
      zoomControl: false
    });
    const basemap = L.tileLayer(basemapURL, {
      detectRetina: true,
      retina: '@2x',
    });
    basemap.addTo(map.current)
  }, [
    lat,
    lng,
    zoom,
    basemapURL,
  ]);
  return (
      <div id="map"/>
  );
}

const createPointsLayer = async () => {
  let pointData = await getPoints();

  const pointsArray = [];
  const metadataArray = [];
  pointData.forEach(p=>{
    const circleMarker = L.circleMarker(p, {
      color: `#${p.color}`
    }).setRadius(1);
    pointsArray.push(circleMarker);
    metadataArray.push(p.type);
  });

  return {pointsLayer: L.layerGroup(pointsArray), pointsMeta: metadataArray};
};

function makeMarkupOnePoint(lat, lng, type = '', info = '') {
  return `
    <div class="widget">
    ${lat ? `
    <h3>${lat}, ${lng}</h3>
    `: ''}
    ${type ? `
    <h3>${type}</h3>
    `: ''}
    ${info ? `
    <h4>${info}</h4>
    `: '<h4>No hay dirección</h4>'}
    </div>
  `;
}


Map.propTypes = {
  basemapURL: PropTypes.string,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  zoom: PropTypes.number,
  requestPoint: PropTypes.shape({
    current: PropTypes.func,
  })
};
Map.defaultProps = {
  zoom: 13,
  basemapURL: 'https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png',
  requestPoint: {
    current: () => {},
  }
}

export default Map;
    
