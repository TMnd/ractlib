import React from 'react';
import {GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
import {PropTypes} from 'prop-types';
import './MapGoogle.css';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 40.59219664314922,
  lng: -8.612452335867369,
};

const defaultMapOptions = {
  fullscreenControl: false,
  zoomControl: true,
  streetViewControl: false,
  rotateControl: false,
  mapTypeId: "satellite",
  mapTypeControl: false,
  maxZoom: 16,
};

const MapGoogle = ({data, apiKey}) => {
  const {isLoaded} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  // const [map, setMap] = React.useState(null);
  const [mapTitle, setMapTitle] = React.useState("");

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
    // eslint-disable-next-line max-len
    const mapTitle = document.getElementsByClassName("navbar-title")[0].innerText;
    setMapTitle(mapTitle);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className='map--container'>
      <div className='map--info'>
        <div className='map--info--msg'>
          <div className="place-card place-card-large">
            <div className="place-desc-large">
              <div className="place-name">{mapTitle}</div>
              <div className="address">{data.address}</div>
              <div className="bottom-actions">
                <div className="google-maps-link">
                  <a aria-label="Ver mapa ampliado" target="_blank" rel="noreferrer" href="https://maps.google.com/maps?ll=40.592179,-8.612524&amp;z=13&amp;t=m&amp;hl=pt&amp;gl=US&amp;mapclient=embed&amp;q=R.%20Tom%C3%A9%20de%20Barros%20Queiroz%2032%203810-833%20Oliveirinha">Ver mapa ampliado</a>
                </div>
              </div>
            </div>
            <div className="navigate">
              <div className="navigate">
                <a aria-label="Veja rotas para este local no Google Maps." target="_blank" rel="noreferrer" href="https://maps.google.com/maps/dir//R.+Tom%C3%A9+de+Barros+Queiroz+32+3810-833+Oliveirinha/@40.5921794,-8.6125243,13z/data=!4m5!4m4!1m0!1m2!1m1!1s0xd23a3abd9bdce09:0x60592ecbab78d306" className="navigate-link">
                  <div className="icon navigate-icon"></div>
                  <div className="navigate-text">Rotas</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultMapOptions}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Marker position={{lat: center.lat, lng: center.lng}} />
      </GoogleMap>
    </div>
  ) : <></>;
};

export default React.memo(GoogleMap);

MapGoogle.propTypes = {
  data: PropTypes.object.isRequired,
  apiKey: PropTypes.string.isRequired,
};
