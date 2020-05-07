import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import VerifyPhonePresenter from './VerifyPhonePresenter';
import { useMutation } from 'react-apollo';
import { VERIFY_PHONE } from './VerifyPhoneQueries';
import { toast } from 'react-toastify';
import { LOG_USER_IN } from '../../sharedQueries';

type PhoneState = {
  phone: string; // which is coming from PhoneLoginContainer
};

export interface StaticContext {
  statusCode?: number;
}

interface IProps extends RouteComponentProps<{}, StaticContext, PhoneState> {
  location: any;
}

const VerifyPhoneContainer = (props: IProps) => {
  if (!props.location.state) {
    props.history.push('/');
  }

  const [verificationKey, setVerificationKey] = useState('');

  const [logUserIn] = useMutation(LOG_USER_IN);
  const [verifyPhone, { loading }] = useMutation(VERIFY_PHONE, {
    variables: {
      verificationKey,
      phoneNumber: props.location.state.phone,
    },
    onCompleted: (data) => {
      const { CompletePhoneVerification } = data;
      if (CompletePhoneVerification.ok) {
        // TODO: if CompletePhoneVeification.token is null, going to sign up with email or facebook
        // For now, token is null, but logged in~
        logUserIn({
          variables: {
            token: CompletePhoneVerification.token,
          },
        });
        toast.success("You're verified, logging in now");
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
