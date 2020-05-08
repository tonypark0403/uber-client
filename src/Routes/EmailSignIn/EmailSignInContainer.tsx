import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import EmailSignInPresenter from './EmailSignInPresenter';
import { useMutation } from 'react-apollo';
import { EMAIL_SINGIN } from './EmailSignInQueries';
import { toast } from 'react-toastify';
import { LOG_USER_IN } from '../../sharedQueries';
import routes from '../../config/routes';

interface IProps extends RouteComponentProps<any> {}

const EmailSignInContainer = (props: IProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [logUserIn] = useMutation(LOG_USER_IN);
  const [verifyPhone, { loading }] = useMutation(EMAIL_SINGIN, {
    variables: {
      email,
      password,
    },
    onCompleted: (data) => {
      const { EmailSignIn } = data;
      if (EmailSignIn.ok) {
        logUserIn({
          variables: {
            token: EmailSignIn.token,
          },
        });
        toast.success("You're verified, logging in now");
      } else {
        toast.error(EmailSignIn.error);
        if (
          EmailSignIn.error === 'Not Email validated. Please verify it first'
        ) {
          logUserIn({
            variables: {
              token: EmailSignIn.token,
            },
          });
          setTimeout(() => {
            props.history.push({
              pathname: routes.verifyEmail,
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
      onSubmit={verifyPhone}
      onChange={onInputChange}
      email={email}
      password={password}
    />
  );
};

export default EmailSignInContainer;
