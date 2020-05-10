import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import Place from '../../Components/Place';
import styled from '../../Components/Style/typed-components';
import { getPlaces } from '../../types/api';
import routes from '../../config/routes';

const Container = styled.div`
  padding: 0 40px;
`;

const SLink = styled(Link)`
  text-decoration: underline;
`;

interface IProps {
  data?: getPlaces;
  loading: boolean;
}

const PlacesPresenter: React.FC<IProps> = ({
  data: { GetMyPlaces: { places = null } = {} } = {},
  loading,
}) => (
  <React.Fragment>
    <Helmet>
      <title>Places | Number</title>
    </Helmet>
    <Header title={'Places'} backTo={routes.home} />
    <Container>
      {!loading && places && places.length === 0 && 'You have no places'}
      {!loading &&
        places &&
        places.map((place) => (
          <Place
            key={place!.id}
            id={place!.id}
            fav={place!.isFaverite}
            name={place!.name}
            address={place!.address}
          />
        ))}
      <SLink to={routes.addPlace}>Add some places!</SLink>
    </Container>
  </React.Fragment>
);

export default PlacesPresenter;
