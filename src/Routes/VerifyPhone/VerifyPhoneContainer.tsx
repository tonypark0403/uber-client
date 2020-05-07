import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import VerifyPhonePresenter from './VerifyPhonePresenter';
import { useMutation } from 'react-apollo';
import { VERIFY_PHONE } from './VerifyPhoneQueries';
import { toast } from 'react-toastify';

interface IState {
  verificationKey: string;
  phoneNumber: string;
}

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
  const [phoneNumber, setPhoneNumber] = useState(props.location.state.phone);
  const [verifyPhone, { data, loading }] = useMutation(VERIFY_PHONE, {
    variables: {
      verificationKey,
      phoneNumber,
    },
    onCompleted: (data) => {
      const { CompletePhoneVerification } = data;
      if (CompletePhoneVerification.ok) {
        toast.success("You're verified, logging in now");
      } else {
        toast.error(CompletePhoneVerification.error);
      }
    },
  });

  // useEffect(() => {
  //   verifyPhone();
  // }, []);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'verificationKey') {
      setVerificationKey(value);
    } else if (name === 'phoneNumber') {
      setPhoneNumber(value);
    }
    console.log(verificationKey, phoneNumber);
  };

  console.log(data);
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
