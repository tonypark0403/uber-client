import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import PhoneLoginPresenter from './PhoneLoginPresenter';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PHONE_SIGN_IN } from './PhoneLoginQueries';
import { useMutation } from 'react-apollo';
import routes from '../../config/routes';

const PhoneLoginContainer = (props: RouteComponentProps<any>) => {
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('6479208877');

  const [PhoneSignInMutation, { loading }] = useMutation(PHONE_SIGN_IN, {
    variables: { phoneNumber: `${countryCode}${phoneNumber}` },
    onCompleted: (data) => {
      const { StartPhoneVerification } = data;
      const phone = `${countryCode}${phoneNumber}`;
      if (StartPhoneVerification) {
        if (StartPhoneVerification.ok) {
          toast.success(`SMS Sent! Redirecting you to ...`);
          setTimeout(() => {
            props.history.push({
              pathname: routes.verifyPhone,
              state: {
                phone,
              },
            });
          }, 2000);
        } else {
          toast.error(StartPhoneVerification.error);
        }
      }
    },
  });
  // console.log('phoneSignIn:', data);

  const onInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'countryCode') {
      setCountryCode(value);
    } else {
      setPhoneNumber(value);
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const phone = `${countryCode}${phoneNumber}`;
    const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(phone);
    if (isValid) {
      await PhoneSignInMutation();
    } else {
      toast.error(`Please write a valid phone number`);
    }
  };

  return (
    <PhoneLoginPresenter
      countryCode={countryCode}
      phoneNumber={phoneNumber}
      onInputChange={onInputChange}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};

export default PhoneLoginContainer;
