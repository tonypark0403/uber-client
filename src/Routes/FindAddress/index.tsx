import { GoogleApiWrapper } from 'google-maps-react';
import FindAddress from './FindAddressContainer';
import config from '../../config';
export default GoogleApiWrapper({
  apiKey: config.GOOGLE.KEY,
})(FindAddress);
