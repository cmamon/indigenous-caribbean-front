import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import dotenv from 'dotenv';

class Application extends React.Component {
  constructor(props) {
    var maxBounds = [
      [-100.608744, 0.5], // Southwest coordinates
      [-42.391255, 31] // Northeast coordinates
    ];

    super(props);
    this.state = {
      lng: -68,
      lat: 18,
      zoom: 4.25,
      minZoom: 4.25,
      maxBounds: maxBounds
    };
  }

  componentDidMount() { 
    dotenv.config();
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      minZoom: this.state.minZoom,
      maxBounds: this.state.maxBounds
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  render() {
    return (
      <div>
        <div className='sidebarStyle'>
          <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
        </div>
        <div ref={el => this.mapContainer = el} className="mapContainer" />
      </div>
    )
  }
}
   
ReactDOM.render(<Application />, document.getElementById('app'));
