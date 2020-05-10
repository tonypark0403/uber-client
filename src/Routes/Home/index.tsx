import { GoogleApiWrapper } from 'google-maps-react';
import HomeContainer from './HomeContainer';
import config from '../../config';
export default GoogleApiWrapper({
  apiKey: config.GOOGLE.KEY,
})(HomeContainer);
