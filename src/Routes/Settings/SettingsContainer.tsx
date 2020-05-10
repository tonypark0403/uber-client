import React from 'react';
import { useMutation, useQuery, QueryResult } from 'react-apollo';
import { USER_PROFILE, GET_PLACES } from '../../sharedNotLocalQueries';
import { LOG_USER_OUT } from '../../sharedQueries';
import { userProfile, getPlaces } from '../../types/api';
import SettingsPresenter from './SettingsPresenter';
import { InMemoryCache } from 'apollo-boost';

const SettingsContainer = () => {
  const [logUserOut] = useMutation(LOG_USER_OUT, {
    update: (caches) => {
      caches = new InMemoryCache();
      window.location.reload();
    },
  });
  const {
    data: userData,
    loading: userLoading,
  }: QueryResult<userProfile, Record<string, any>> = useQuery(USER_PROFILE);
  const {
    data: placesData,
    loading: placesLoading,
  }: QueryResult<getPlaces, Record<string, any>> = useQuery(GET_PLACES);
  return (
    <SettingsPresenter
      userDataLoading={userLoading}
      placesLoading={placesLoading}
      userData={userData}
      placesData={placesData}
      logUserOut={logUserOut}
    />
  );
};

export default SettingsContainer;
