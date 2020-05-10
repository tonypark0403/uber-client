import { GoogleApiWrapper } from 'google-maps-react';
import FindAddressContainer from './FindAddressContainer';
import config from '../../config';
export default GoogleApiWrapper({
  apiKey: config.GOOGLE.KEY,
})(FindAddressContainer);
