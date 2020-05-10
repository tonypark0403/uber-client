import React from 'react';
import ReactDOM from 'react-dom';
import { geoCode, reverseGeoCode } from '../../utils/mapHelpers';
import FindAddressPresenter from './FindAddressPresenter';
import { toast } from 'react-toastify';
import { RouteComponentProps } from 'react-router-dom';
import routes from '../../config/routes';

interface IState {
  lat: number;
  lng: number;
  address: string;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
}

class FindAddressContainer extends React.Component<IProps, IState> {
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

  private handleGeoSucces: PositionCallback = (positon: Position) => {
    const {
      coords: { latitude, longitude },
    } = positon;
    // console.log(positon);
    this.setState({
      lat: latitude,
      lng: longitude,
    });
    this.loadMap(latitude, longitude);
    this.reverseGeocodeAddress(latitude, longitude);
  };

  private handleGeoError: PositionErrorCallback = () => {
    toast.error('No location');
  };

  private loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    console.log('mapRef:', this.mapRef);
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng,
      },
      disableDefaultUI: true,
      minZoom: 9,
      maxZoom: 20,
      zoom: 12,
    };
    this.map = new maps.Map(mapNode, mapConfig);
    this.map.addListener('dragend', this.handleDragEnd);
  };

  private handleDragEnd = () => {
    const newCenter = this.map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    this.setState({
      lat,
      lng,
    });
    this.reverseGeocodeAddress(lat, lng);
  };

  private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    this.setState({
      [name]: value,
    } as any);
  };

  private onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.onInputBlur();
    }
  };

  private onInputBlur = async () => {
    // toast.info('Address updated');
    const { address } = this.state;
    const result = await geoCode(address);
    if (result) {
      const { lat, lng, formatted_address: formatedAddress } = result;
      this.setState({
        address: formatedAddress,
        lat,
        lng,
      });
      this.map.panTo({ lat, lng });
      this.map.setZoom(18);
      // const latLng = new google.maps.LatLng(lat, lng);
      // this.map.panTo(latLng);
    }
  };

  private reverseGeocodeAddress = async (lat: number, lng: number) => {
    const address = await reverseGeoCode(lat, lng);
    if (address) {
      this.setState({
        address,
      });
    }
  };

  private onPickPlace = () => {
    const { address, lat, lng } = this.state;
    const { history } = this.props;
    history.push({
      pathname: routes.addPlace,
      state: {
        address,
        lat,
        lng,
      },
    });
    // console.log(address, lat, lng);
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
        onKeyDown={this.onKeyDown}
        onPickPlace={this.onPickPlace}
      />
    );
  }
}

export default FindAddressContainer;
