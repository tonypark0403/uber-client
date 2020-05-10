import React from 'react';
import { useQuery, QueryResult } from 'react-apollo';
import { GET_PLACES } from '../../sharedNotLocalQueries';
import { getPlaces } from '../../types/api';
import PlacesPresenter from './PlacesPresenter';

const PlacesContainer = () => {
  const { data, loading }: QueryResult<getPlaces> = useQuery(GET_PLACES);
  return <PlacesPresenter data={data} loading={loading} />;
};

export default PlacesContainer;
