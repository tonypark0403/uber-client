import React from 'react';
import ReactDOM from 'react-dom';
import { reverseGeoCode } from '../../utils/mapHelpers';
import FindAddressPresenter from './FindAddressPresenter';
import { toast } from 'react-toastify';

interface IState {
  lat: number;
  lng: number;
  address: string;
}

class FindAddressContainer extends React.Component<any, IState> {
  mapRef: any;
  map: google.maps.Map;

  state = {
    address: '',
    lat: 0,
    lng: 0,
  };

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSucces,
      this.handleGeoError
    );
  }

  private handleGeoSucces = (positon: Position) => {
    const {
      coords: { latitude, longitude },
    } = positon;
    //console.log(positon);
    this.setState({
      lat: latitude,
      lng: longitude,
    });
    this.loadMap(latitude, longitude);
  };

  private handleGeoError = () => {
    toast.error('No location');
  };

  private loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng,
      },
      disableDefaultUI: true,
      zoom: 11,
    };
    this.map = new maps.Map(mapNode, mapConfig);
    this.map.addListener('dragend', this.handleDragEnd);
  };

  private handleDragEnd = async () => {
    const newCenter = this.map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    const address = await reverseGeoCode(lat, lng);
    this.setState({
      address,
      lat,
      lng,
    });
    reverseGeoCode(lat, lng);
  };

  private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    this.setState({
      [name]: value,
    } as any);
  };

  private onInputBlur = () => {
    toast.info('Address updated');
  };

  render() {
    // console.log(this.props); // check google
    // console.log(this.state);
    const { address } = this.state;
    return (
      <FindAddressPresenter
        mapRef={this.mapRef}
        address={address}
        onInputChange={this.onInputChange}
        onInputBlur={this.onInputBlur}
      />
    );
  }
}

export default FindAddressContainer;
