import { SubscribeToMoreOptions } from 'apollo-client';
import React from 'react';
import { useQuery, QueryResult, useMutation } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import { USER_PROFILE } from '../../sharedNotLocalQueries';
import RidePresenter from './RidePresenter';
import { GET_RIDE, RIDE_SUBSCRIPTION, UPDATE_RIDE_STATUS } from './RideQueries';
import { userProfile, getRide } from '../../types/api';
import routes from '../../config/routes';

interface IProps extends RouteComponentProps<any> {}

const RideContainer = (props: IProps) => {
  const {
    match: {
      params: { rideId },
    },
  } = props;
  if (!rideId) {
    props.history.push(routes.home);
  }

  const {
    data: userData,
  }: QueryResult<userProfile, Record<string, any>> = useQuery(USER_PROFILE);

  const {
    data,
    loading,
    subscribeToMore,
  }: QueryResult<getRide, Record<string, any>> = useQuery(GET_RIDE, {
    variables: { rideId: Number(rideId) },
  });
  const subscribeOptions: SubscribeToMoreOptions = {
    document: RIDE_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) {
        return prev;
      }
      const {
        data: {
          RideStatusSubscription: { status },
        },
      } = subscriptionData;
      if (status === 'FINISHED') {
        window.location.href = routes.home;
      }
    },
  };
  subscribeToMore(subscribeOptions);
  const [updateRideFn] = useMutation(UPDATE_RIDE_STATUS);
  return (
    <RidePresenter
      userData={userData}
      loading={loading}
      data={data}
      updateRideFn={updateRideFn}
    />
  );
};
export default RideContainer;
