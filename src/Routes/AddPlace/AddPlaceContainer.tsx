import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import AddPlacePresenter from './AddPlacePresenter';
import { useMutation } from 'react-apollo';
import { ADD_PLACE } from './AddPlaceQueries';
import { toast } from 'react-toastify';
import { GET_PLACES } from '../../sharedNotLocalQueries';

interface IProps extends RouteComponentProps<any> {
  location;
}

const AddPlaceContainer: React.FC<IProps> = (props) => {
  const { location: { state = {} } = {} } = props;
  const [address, setAddress] = useState(state.address || '');
  const [name, setName] = useState('');
  const [lat, setLat] = useState(state.lat || 0);
  const [lng, setLng] = useState(state.lng || 0);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const {
      target: { name: inputName, value },
    } = event;
    switch (inputName) {
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
      lat,
      lng,
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
      pickedAddress={lat !== 0 && lng !== 0}
    />
  );
};

export default AddPlaceContainer;
