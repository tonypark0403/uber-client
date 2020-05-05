import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import PhoneLoginPresenter from './PhoneLoginPresenter';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PHONE_SIGN_IN } from './PhoneLoginQueries';
import { useMutation, Mutation } from 'react-apollo';

interface IState {
  countryCode: string;
  phoneNumber: string;
}

const PhoneLoginContainer = (props: RouteComponentProps<any>) => {
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('6471231234');
  const [loading, setLoading] = useState(false);

  const [phoneSignIn, { data }] = useMutation(PHONE_SIGN_IN);

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
    // tslint:disable-next-line
    // console.log(countryCode, phoneNumber);
    const isValid: boolean = /^\+[1-9]{1}[0-9]{7,11}$/.test(
      `${countryCode}${phoneNumber}`
    );
    // tslint:disable-next-line
    // console.log(isValid);
    if (!isValid) {
      toast.error(`Please write a valid phone number`);
    } else {
      setLoading(true);
      const {
        data: { StartPhoneVerification },
      } = await phoneSignIn({
        variables: { phoneNumber: `${countryCode}${phoneNumber}` },
      });
      setLoading(false);
      console.log(StartPhoneVerification);
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
