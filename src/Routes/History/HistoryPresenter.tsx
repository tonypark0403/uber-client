import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import styled from '../../Components/Style/typed-components';
import { historyRides } from '../../types/api';
import routes from '../../config/routes';
import Ride from '../../Components/Ride';

const Container = styled.div`
  padding: 0 40px;
`;

const SLink = styled(Link)`
  text-decoration: underline;
`;

interface IProps {
  data?: historyRides;
  onRequestDrive: any;
}

const PlacesPresenter: React.FC<IProps> = ({
  data: { HistoryRides: { rides = null } = {} } = {},
  onRequestDrive,
}) => (
  <React.Fragment>
    <Helmet>
      <title>History | Uber</title>
    </Helmet>
    <Header title={'History'} backTo={routes.home} />
    <Container>
      {rides && rides.length === 0 && (
        <>
          'You have no history'
          <br />
          <br />
        </>
      )}
      {rides &&
        rides.map((ride, index) => {
          if (ride) {
            return (
              <Ride
                key={ride.id}
                order={index + 1}
                distance={ride.distance}
                dropOffAddress={ride.dropOffAddress}
                driverName={ride.driver.fullName}
                onRequestDrive={onRequestDrive}
              />
            );
          }
          return null;
        })}
    </Container>
  </React.Fragment>
);

export default PlacesPresenter;
