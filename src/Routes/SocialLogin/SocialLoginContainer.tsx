import React from 'react';
import SocialLoginPresenter from './SocialLoginPresenter';
import { useMutation } from 'react-apollo';
import { FACEBOOK_CONNECT } from './SocialLoginQueries';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LOG_USER_IN } from '../../sharedQueries';

const SocialLoginContainer = (props: RouteComponentProps) => {
  const [logUserIn] = useMutation(LOG_USER_IN);
  const [facebookConnect] = useMutation(FACEBOOK_CONNECT, {
    onCompleted: (data) => {
      const { FacebookConnect } = data;
      if (FacebookConnect.ok) {
        // TODO: if CompletePhoneVeification.token is null, going to sign up with email or facebook
        // For now, token is null, but logged in~
        logUserIn({
          variables: {
            token: FacebookConnect.token,
          },
        });
        toast.success("You're verified, logging in now");
      } else {
        toast.error(FacebookConnect.error);
      }
    },
  });

  const callback = ({ name, id, email, accessToken, first_name }) => {
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[1];
    // console.log(name, id, email, accessToken, firstName, first_name);
    if (accessToken) {
      toast.success(`Welcome ${name}!`);
      facebookConnect({
        variables: {
          email,
          fbId: id,
          firstName,
          lastName,
        },
      });
    } else {
      toast.error('Could not log you in 😔');
    }
  };
  return <SocialLoginPresenter loginCallback={callback} />;
};

export default SocialLoginContainer;
