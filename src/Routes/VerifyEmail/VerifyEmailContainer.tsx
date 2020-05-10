import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import VerifyEmailPresenter from './VerifyEmailPresenter';
import { useMutation } from 'react-apollo';
import { VERIFY_EMAIL } from './VerifyEmailQueries';
import { toast } from 'react-toastify';
import routes from '../../config/routes';

interface IProps extends RouteComponentProps<any> {}

const VerifyEmailContainer = (props: IProps) => {
  const [verificationKey, setVerificationKey] = useState('');

  const [verifyEmail, { loading }] = useMutation(VERIFY_EMAIL, {
    variables: {
      verificationKey,
    },
    onCompleted: (data) => {
      const { CompleteEmailVerification } = data;
      if (CompleteEmailVerification.ok) {
        if (CompleteEmailVerification.token) {
          toast.success("You're verified, Thank you!");
        } else {
          setTimeout(() => {
            props.history.push({
              pathname: routes.home,
            });
          }, 2000);
        }
      } else {
        toast.error(CompleteEmailVerification.error);
      }
    },
  });

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { value },
    } = event;
    setVerificationKey(value);
  };

  return (
    <VerifyEmailPresenter
      loading={loading}
      onSubmit={verifyEmail}
      onChange={onInputChange}
      verificationKey={verificationKey}
    />
  );
};

export default VerifyEmailContainer;
