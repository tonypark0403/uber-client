import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import EmailSignInPresenter from './ForgetPasswordPresenter';
import { useMutation } from 'react-apollo';
import { UPDATE_PASSWORD } from './ForgetPasswordQueries';
import { toast } from 'react-toastify';
import routes from '../../config/routes';

interface IProps extends RouteComponentProps<any> {}

const ForgetPasswordContainer = (props: IProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [updatePassword, { loading }] = useMutation(UPDATE_PASSWORD, {
    variables: {
      email,
      password,
    },
    onCompleted: (data) => {
      const { UpdatePassword } = data;
      if (UpdatePassword.ok) {
        toast.success('Updated password successfully!. Please log in again!');
        setTimeout(() => {
          props.history.push({
            pathname: routes.emailSignIn,
          });
        }, 2000);
      } else {
        toast.error(UpdatePassword.error);
        if (UpdatePassword.error === 'Please verify your phone number first!') {
          setTimeout(() => {
            props.history.push({
              pathname: routes.phoneLogin,
            });
          }, 2000);
        }
      }
    },
  });

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  };

  return (
    <EmailSignInPresenter
      loading={loading}
      onSubmit={updatePassword}
      onChange={onInputChange}
      password={password}
      email={email}
    />
  );
};

export default ForgetPasswordContainer;
