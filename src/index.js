import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiY21hbW9uIiwiYSI6ImNraHBrNWxyZzAxZWQycG56cWdpbGo4cHEifQ.osCGG7Jk4ZTa5wCNFN6Oow';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -67,
      lat: 19,
      minZoom: 4.25,
      zoom: 4.25
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
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
