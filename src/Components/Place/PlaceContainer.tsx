import React from 'react';
import { useMutation } from 'react-apollo';
import { GET_PLACES } from '../../sharedNotLocalQueries';
import PlacePresenter from './PlacePresenter';
import { EDIT_PLACE, DELETE_PLACE } from './PlaceQueries';

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  id: number;
}

const PlaceContainer: React.FC<IProps> = (props) => {
  const { id, fav, name, address } = props;
  const [editPlace] = useMutation(EDIT_PLACE, {
    variables: {
      isFaverite: !fav,
      placeId: id,
    },
    refetchQueries: [{ query: GET_PLACES }],
  });
  const [removePlace] = useMutation(DELETE_PLACE, {
    variables: { placeId: id },
    refetchQueries: [{ query: GET_PLACES }],
  });
  return (
    <PlacePresenter
      onStarPress={editPlace}
      fav={fav}
      name={name}
      address={address}
      onRemovePress={removePlace}
    />
  );
};

export default PlaceContainer;
