import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import Place from '../../Components/Place';
import styled from '../../Components/Style/typed-components';
import { userProfile, getPlaces } from '../../types/api';
import routes from '../../config/routes';

const Container = styled.div`
  padding: 0px 40px;
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const GridLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 10px;
  margin-bottom: 10px;
`;

const Keys = styled.div``;

const Key = styled.span`
  display: block;
  margin-bottom: 5px;
`;

const FakeLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const SLink = styled(Link)`
  display: block;
  text-decoration: underline;
  margin: 20px 0px;
`;

interface IProps {
  logUserOut: any;
  userData?: userProfile;
  userDataLoading: boolean;
  placesData?: getPlaces;
  placesLoading: boolean;
}

const SettingsPresenter: React.FC<IProps> = ({
  logUserOut,
  userData: { GetMyProfile: { user = null } = {} } = {},
  placesData: { GetMyPlaces: { places = null } = {} } = {},
  userDataLoading,
  placesLoading,
}) => (
  <React.Fragment>
    <Helmet>
      <title>Settings | Nuber</title>
    </Helmet>
    <Header title={'Account Settings'} backTo={routes.home} />
    <Container>
      <GridLink to={routes.editAccount}>
        {!userDataLoading &&
          user &&
          user.profilePhoto &&
          user.email &&
          user.fullName && (
            <React.Fragment>
              <Image src={user.profilePhoto} />
              <Keys>
                <Key>{user.fullName}</Key>
                <Key>{user.email}</Key>
              </Keys>
            </React.Fragment>
          )}
      </GridLink>
      {!placesLoading &&
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
      <SLink to={routes.places}>Go to Places</SLink>
      <SLink to={routes.history}>History</SLink>
      <FakeLink onClick={logUserOut}>Log Out</FakeLink>
    </Container>
  </React.Fragment>
);

export default SettingsPresenter;
