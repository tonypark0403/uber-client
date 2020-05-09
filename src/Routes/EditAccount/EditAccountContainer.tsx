import React, { useState } from 'react';
import { useMutation, useQuery, QueryResult } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import EditAccountPresenter from './EditAccountPresenter';
import { UPDATE_PROFILE } from './EditAccountQueries';
import { userProfile } from '../../types/api';
import { USER_PROFILE } from '../../sharedNotLocalQueries';
import { toast } from 'react-toastify';

interface IProps extends RouteComponentProps<any> {}

const EditAccountContainer = (props: IProps) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');

  const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE, {
    variables: {
      email,
      firstName,
      lastName,
      profilePhoto,
    },
    refetchQueries: [{ query: USER_PROFILE }],
    onCompleted: (data) => {
      const { UpdateMyProfile } = data;
      if (UpdateMyProfile.ok) {
        toast.success('Profile updated!');
      } else if (UpdateMyProfile.error) {
        toast.error(UpdateMyProfile.error);
      }
    },
  });

  const { data }: QueryResult<userProfile, Record<string, any>> = useQuery(
    USER_PROFILE,
    {
      onCompleted: (data: userProfile) => {
        if ('GetMyProfile' in data) {
          const {
            GetMyProfile: { user },
          } = data;
          if (user !== null) {
            const { firstName, lastName, email, profilePhoto } = user;
            setEmail(email || '');
            setFirstName(firstName);
            setLastName(lastName);
            setProfilePhoto(
              profilePhoto ||
                'https://lh3.googleusercontent.com/-CTwXMuZRaWw/AAAAAAAAAAI/AAAAAAAAAUg/8T5nFuIdnHE/photo.jpg'
            );
          }
        }
      },
    }
  );
  console.log('profileQuery:', data);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'profilePhoto':
        setProfilePhoto(value);
        break;
    }
  };

  return (
    <EditAccountPresenter
      email={email}
      firstName={firstName}
      lastName={lastName}
      profilePhoto={profilePhoto}
      onInputChange={onInputChange}
      loading={loading}
      onSubmit={updateProfile}
    />
  );
};

export default EditAccountContainer;
