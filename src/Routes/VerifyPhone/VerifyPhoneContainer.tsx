import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import VerifyPhonePresenter from './VerifyPhonePresenter';
import { useMutation } from 'react-apollo';
import { VERIFY_PHONE } from './VerifyPhoneQueries';

interface IState {
  key: string;
  phoneNumber: string;
}

interface IProps extends RouteComponentProps<any> {
  location: any;
}

const VerifyPhoneContainer = (props: IProps) => {
  if (!props.location.state) {
    props.history.push('/');
  }
  const [key, setKey] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(props.location.state.phone);
  const [verifyPhone, { data, loading }] = useMutation(VERIFY_PHONE, {
    variables: {
      key,
      phoneNumber,
    },
  });

  useEffect(() => {
    verifyPhone();
  }, []);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'key') {
      setKey(value);
    } else if (name === 'phoneNumber') {
      setPhoneNumber(value);
    }
  };

  console.log(data);
  return <VerifyPhonePresenter onChange={onInputChange} key={key} />;
};

export default VerifyPhoneContainer;
