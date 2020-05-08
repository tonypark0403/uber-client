import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import VerifyPhonePresenter from './VerifyPhonePresenter';
import { useMutation } from 'react-apollo';
import { VERIFY_PHONE } from './VerifyPhoneQueries';
import { toast } from 'react-toastify';
import { LOG_USER_IN } from '../../sharedQueries';
import routes from '../../config/routes';

type PhoneState = {
  phone?: string;
};

export interface StaticContext {
  statusCode?: number;
}

interface IProps extends RouteComponentProps<{}, StaticContext, PhoneState> {
  location: any;
}

const VerifyPhoneContainer = (props: IProps) => {
  let phoneNumber;
  if (!props.location.state) {
    props.history.push('/');
  } else {
    phoneNumber = props.location.state.phone;
  }

  const [verificationKey, setVerificationKey] = useState('');

  const [logUserIn] = useMutation(LOG_USER_IN);
  const [verifyPhone, { loading }] = useMutation(VERIFY_PHONE, {
    variables: {
      verificationKey,
      phoneNumber,
    },
    onCompleted: (data) => {
      const { CompletePhoneVerification } = data;
      if (CompletePhoneVerification.ok) {
        if (CompletePhoneVerification.token) {
          logUserIn({
            variables: {
              token: CompletePhoneVerification.token,
            },
          });
          toast.success("You're verified, logging in now");
        } else {
          setTimeout(() => {
            props.history.push({
              pathname: routes.emailSignUp,
              state: {
                phone: props.location.state.phone,
              },
            });
          }, 2000);
        }
      } else {
        toast.error(CompletePhoneVerification.error);
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
    <VerifyPhonePresenter
      loading={loading}
      onSubmit={verifyPhone}
      onChange={onInputChange}
      verificationKey={verificationKey}
    />
  );
};

export default VerifyPhoneContainer;
