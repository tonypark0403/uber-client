import React from 'react';
import { useMutation, useQuery, QueryResult } from 'react-apollo';
import { USER_PROFILE } from '../../sharedNotLocalQueries';
import { LOG_USER_OUT } from '../../sharedQueries';
import { userProfile } from '../../types/api';
import SettingsPresenter from './SettingsPresenter';

const SettingsContainer = () => {
  const [logUserOut] = useMutation(LOG_USER_OUT);
  const {
    data,
    loading,
  }: QueryResult<userProfile, Record<string, any>> = useQuery(USER_PROFILE);
  return (
    <SettingsPresenter
      userDataLoading={loading}
      userData={data}
      logUserOut={logUserOut}
    />
  );
};

export default SettingsContainer;
