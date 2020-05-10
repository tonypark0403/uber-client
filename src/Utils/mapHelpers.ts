import axios from 'axios';
import config from '../config';
import { toast } from 'react-toastify';

export const geoCode = () => null;

export const reverseGeoCode = async (lat: number, lng: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${config.GOOGLE.KEY}`;
  const { data } = await axios(URL);
  // console.log(status, data);
  if (!data.error_message) {
    const { results } = data;
    const firstPlace = results[0];
    const address = firstPlace.formatted_address;
    return address;
  } else {
    toast.error(data.error_message);
  }
};
