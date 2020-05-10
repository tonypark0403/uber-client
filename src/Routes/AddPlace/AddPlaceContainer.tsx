import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import AddPlacePresenter from './AddPlacePresenter';
import { useMutation } from 'react-apollo';
import { ADD_PLACE } from './AddPlaceQueries';
import { toast } from 'react-toastify';
import { GET_PLACES } from '../../sharedNotLocalQueries';

interface IProps extends RouteComponentProps<any> {}

const AddPlaceContainer: React.FC<IProps> = (props) => {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [lat, setLat] = useState('43.788741');
  const [lng, setLng] = useState('-79.336196');

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case 'address':
        setAddress(value);
        break;
      case 'name':
        setName(value);
        break;
    }
  };

  const [addPlace] = useMutation(ADD_PLACE, {
    variables: {
      address,
      isFaverite: false,
      lat: Number(lat),
      lng: Number(lng),
      name,
    },
    onCompleted: (data) => {
      const { AddPlace } = data;
      if (AddPlace.ok) {
        toast.success('Place added!');
        setTimeout(() => {
          props.history.push('/places');
        }, 2000);
      } else {
        toast.error(AddPlace.error);
      }
    },
    refetchQueries: [{ query: GET_PLACES }],
  });

  return (
    <AddPlacePresenter
      onInputChange={onInputChange}
      address={address}
      name={name}
      loading={false}
      onSubmit={addPlace}
    />
  );
};

export default AddPlaceContainer;
