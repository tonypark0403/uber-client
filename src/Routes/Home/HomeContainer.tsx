import React from 'react';
import ReactDOM from 'react-dom';
import { graphql, Query, MutationFunction, Mutation } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import { USER_PROFILE } from '../../sharedNotLocalQueries';
import HomePresenter from './HomePresenter';
import { geoCode, reverseGeoCode } from '../../utils/mapHelpers';
import { toast } from 'react-toastify';
import {
  reportMovement,
  reportMovementVariables,
  getDrivers,
  userProfile,
  requestRide,
} from '../../types/api';
import {
  REPORT_LOCATION,
  GET_NEARBY_DRIVERS,
  REQUEST_RIDE,
  GET_NEARBY_RIDE,
  ACCEPT_RIDE,
} from './HomeQueries';

interface IState {
  isMenuOpen: boolean;
  lat: number;
  lng: number;
  toAddress: string;
  toLat: number;
  toLng: number;
  distance: string;
  duration?: string;
  price?: string;
  fromAddress: string;
  isDriving: boolean;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
  reportLocation: MutationFunction;
}

class HomeContainer extends React.Component<IProps, IState> {
  mapRef: any;
  map: google.maps.Map;
  userMarker: google.maps.Marker;
  toMarker: google.maps.Marker;
  directions: google.maps.DirectionsRenderer;
  drivers: google.maps.Marker[];

  state = {
    distance: '',
    duration: undefined,
    fromAddress: '',
    isMenuOpen: false,
    isDriving: true,
    lat: 0,
    lng: 0,
    price: '',
    toAddress: '',
    toLat: 0,
    toLng: 0,
  };

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.drivers = [];
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSucces,
      this.handleGeoError
    );
  }

  private toggleMenu = () => {
    this.setState((state) => {
      return {
        isMenuOpen: !state.isMenuOpen,
      };
    });
  };

  private handleGeoSucces = (positon: Position) => {
    const {
      coords: { latitude, longitude },
    } = positon;
    this.setState({
      lat: latitude,
      lng: longitude,
    });
    this.getFromAdress(latitude, longitude);
    this.loadMap(latitude, longitude);
  };

  private getFromAdress = async (lat: number, lng: number) => {
    const address = await reverseGeoCode(lat, lng);
    if (address) {
      this.setState({
        fromAddress: address,
      });
    }
  };

  private loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    // console.log('mapRef:', this.mapRef);
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng,
      },
      disableDefaultUI: true,
      // minZoom: 9,
      maxZoom: 20,
      zoom: 12,
    };

    this.map = new maps.Map(mapNode, mapConfig);

    const userMarkerOptions: google.maps.MarkerOptions = {
      icon: {
        path: maps.SymbolPath.CIRCLE,
        scale: 7,
      },
      position: {
        lat,
        lng,
      },
    };

    this.userMarker = new maps.Marker(userMarkerOptions);
    this.userMarker.setMap(this.map);

    const watchOptions: PositionOptions = {
      enableHighAccuracy: true,
    };

    navigator.geolocation.watchPosition(
      this.handleGeoWatchSuccess,
      this.handleGeoWatchError,
      watchOptions
    );
  };

  private handleGeoWatchSuccess = (position: Position) => {
    // console.log(position);
    const { reportLocation } = this.props;
    const {
      coords: { latitude, longitude },
    } = position;
    this.userMarker.setPosition({ lat: latitude, lng: longitude });
    this.map.panTo({ lat: latitude, lng: longitude });
    reportLocation({
      variables: {
        lat: parseFloat(latitude.toFixed(10)),
        lng: parseFloat(longitude.toFixed(10)),
      },
    });
  };

  private handleGeoWatchError = () => {
    console.log('Error watching you');
  };

  private handleGeoError = () => {
    console.log('No location');
  };

  private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    this.setState({
      [name]: value,
    } as any);
  };

  private onAddressSubmit = async () => {
    const { toAddress } = this.state;
    const { google } = this.props;
    const maps = google.maps;
    const result = await geoCode(toAddress);
    if (result !== false) {
      const { lat, lng, formatted_address: formatedAddress } = result;
      if (this.toMarker) {
        this.toMarker.setMap(null);
      }
      const toMarkerOptions: google.maps.MarkerOptions = {
        position: {
          lat,
          lng,
        },
      };
      this.toMarker = new maps.Marker(toMarkerOptions);
      this.toMarker.setMap(this.map);
      const bounds = new maps.LatLngBounds();
      bounds.extend({ lat, lng });
      bounds.extend({ lat: this.state.lat, lng: this.state.lng });
      this.map.fitBounds(bounds);
      this.setState(
        {
          toAddress: formatedAddress,
          toLat: lat,
          toLng: lng,
        },
        this.createPath
      );
    }
  };

  private onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.onAddressSubmit();
    }
  };

  private createPath = () => {
    const { toLat, toLng, lat, lng } = this.state;
    if (this.directions) {
      this.directions.setMap(null);
    }
    const renderOptions: google.maps.DirectionsRendererOptions = {
      polylineOptions: {
        strokeColor: '#000',
      },
      suppressMarkers: true,
    };
    this.directions = new google.maps.DirectionsRenderer(renderOptions);
    const directionsService: google.maps.DirectionsService = new google.maps.DirectionsService();
    const to = new google.maps.LatLng(toLat, toLng);
    const from = new google.maps.LatLng(lat, lng);
    const directionsOptions: google.maps.DirectionsRequest = {
      destination: to,
      origin: from,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    directionsService.route(directionsOptions, this.handleRouteRequest);
  };

  private handleRouteRequest = (
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === google.maps.DirectionsStatus.OK) {
      const { routes } = result;
      const {
        distance: { text: distance },
        duration: { text: duration },
      } = routes[0].legs[0];
      this.directions.setDirections(result);
      this.directions.setMap(this.map);
      this.setState(
        {
          distance,
          duration,
        },
        this.setPrice
      );
    } else {
      toast.error('There is no route there, you have to take an airplane!');
    }
  };

  private setPrice = () => {
    const { distance } = this.state;
    if (distance) {
      this.setState({
        price: Number(parseFloat(distance.replace(',', ''))).toFixed(2),
      });
    }
  };

  private handleNearByDrivers = (data: {} | getDrivers) => {
    if (!data) {
      return;
    }
    if ('GetNearbyDrivers' in data) {
      const {
        GetNearbyDrivers: { drivers, ok },
      } = data;
      if (ok && drivers) {
        for (const driver of drivers) {
          if (driver) {
            // console.log('driver:', driver);
            const exisitingDriver:
              | google.maps.Marker
              | undefined = this.drivers.find(
              (driverMarker: google.maps.Marker) => {
                const markerID = driverMarker.get('ID');
                return markerID === driver.id;
              }
            );
            if (exisitingDriver) {
              exisitingDriver.setPosition({
                lat: driver.lastLat,
                lng: driver.lastLng,
              });
              exisitingDriver.setMap(this.map);
            } else {
              const markerOptions: google.maps.MarkerOptions = {
                position: {
                  lat: driver.lastLat,
                  lng: driver.lastLng,
                },
                icon: {
                  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  scale: 5,
                },
              };
              const newMarker: google.maps.Marker = new google.maps.Marker(
                markerOptions
              );
              this.drivers.push(newMarker);
              newMarker.set('ID', driver.id); // to check specific driver above
              newMarker.setMap(this.map);
            }
          }
        }
      }
    }
  };

  private handleRideRequest = (data: requestRide) => {
    const { RequestRide } = data;
    if (RequestRide.ok) {
      toast.success('Drive requested, finding a driver');
    } else {
      toast.error(RequestRide.error);
    }
  };

  private handleProfileQuery = (data: userProfile) => {
    const { GetMyProfile } = data;
    if (GetMyProfile.user) {
      const {
        user: { isDriving },
      } = GetMyProfile;
      this.setState({
        isDriving,
      });
    }
  };

  public render() {
    const {
      isMenuOpen,
      toAddress,
      price,
      distance,
      fromAddress,
      lat,
      lng,
      toLat,
      toLng,
      duration,
      isDriving,
    } = this.state;

    return (
      <Query query={USER_PROFILE} onCompleted={this.handleProfileQuery}>
        {({ loading, data }) => (
          <Query
            query={GET_NEARBY_DRIVERS}
            pollInterval={5000}
            fetchPolicy='cache-and-network'
            skip={isDriving}
            onCompleted={this.handleNearByDrivers}>
            {() => (
              <Mutation
                mutation={REQUEST_RIDE}
                onCompleted={this.handleRideRequest}
                variables={{
                  distance,
                  dropOffAddress: toAddress,
                  dropOffLat: toLat,
                  dropOffLng: toLng,
                  duration: duration || '',
                  pickUpAddress: fromAddress,
                  pickUpLat: lat,
                  pickUpLng: lng,
                  price: parseFloat(price) || 0,
                }}>
                {(requestRideFn) => (
                  <Query query={GET_NEARBY_RIDE} skip={!isDriving}>
                    {({ data: nearbyRide }) => (
                      <Mutation mutation={ACCEPT_RIDE}>
                        {(acceptRideFn) => (
                          <HomePresenter
                            loading={loading}
                            isMenuOpen={isMenuOpen}
                            toggleMenu={this.toggleMenu}
                            mapRef={this.mapRef}
                            toAddress={toAddress}
                            price={price}
                            data={data}
                            onInputChange={this.onInputChange}
                            onAddressSubmit={this.onAddressSubmit}
                            onKeyDown={this.onKeyDown}
                            requestRideFn={requestRideFn}
                            nearbyRide={nearbyRide}
                            acceptRideFn={acceptRideFn}
                          />
                        )}
                      </Mutation>
                    )}
                  </Query>
                )}
              </Mutation>
            )}
          </Query>
        )}
      </Query>
    );
  }
}

export default graphql<any, reportMovement, reportMovementVariables>(
  REPORT_LOCATION,
  {
    name: 'reportLocation',
  }
)(HomeContainer);
