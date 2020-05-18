import React from 'react';
import { useQuery, QueryResult } from 'react-apollo';
import { historyRides } from '../../types/api';
import HistoryPresenter from './HistoryPresenter';
import { GET_HISTORY_RIDES } from './HistoryQueries';
import { RouteComponentProps } from 'react-router-dom';
import routes from '../../config/routes';

interface IProps extends RouteComponentProps<any> {}

const HistoryContainer = (props: IProps) => {
  const { data }: QueryResult<historyRides> = useQuery(GET_HISTORY_RIDES, {
    onCompleted: (data) => {
      console.log('complete:', data);
    },
  });

  const onRequestDrive = (requestAddress: string) => {
    props.history.push({
      pathname: routes.home,
      state: {
        requestAddress,
      },
    });
  };
  return <HistoryPresenter data={data} onRequestDrive={onRequestDrive} />;
};

export default HistoryContainer;
