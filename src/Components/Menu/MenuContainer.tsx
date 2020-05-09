import React from 'react';
import { useQuery, QueryResult } from 'react-apollo';
import { USER_PROFILE } from '../../sharedNotLocalQueries';
import { userProfile } from '../../types/api';
import MenuPresenter from './MenuPresenter';

const MenuContainer = () => {
  const {
    data,
    loading,
  }: QueryResult<userProfile, Record<string, any>> = useQuery(USER_PROFILE);

  return <MenuPresenter data={data} loading={loading} />;
};

export default MenuContainer;
