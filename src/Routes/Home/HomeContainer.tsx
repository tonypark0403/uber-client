import React, { useState } from 'react';
import { useQuery, QueryResult } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { USER_PROFILE } from '../../sharedNotLocalQueries';
import { userProfile } from '../../types/api';
import HomePresenter from './HomePresenter';

interface IProps extends RouteComponentProps<any> {}

const HomeContainer = (props: IProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const {
    // data,
    loading,
  }: QueryResult<userProfile, Record<string, any>> = useQuery(USER_PROFILE);
  if (!loading) {
    // console.log('userProfile:', data, loading);
  }
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <HomePresenter
      loading={loading}
      isMenuOpen={isMenuOpen}
      toggleMenu={toggleMenu}
    />
  );
};

export default HomeContainer;
