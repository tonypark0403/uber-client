import React from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../Components/Button';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import styled from '../../Components/Style/typed-components';
import Form from '../../Components/Form';
import routes from '../../config/routes';

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface IProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePhoto: string;
  age: string;
  phoneNumber: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: any;
  loading: boolean;
}

const EmailSignUpPresenter: React.FC<IProps> = ({
  firstName,
  lastName,
  email,
  password,
  profilePhoto,
  age,
  phoneNumber,
  onChange,
  onSubmit,
  loading,
}) => (
  <Container>
    <Helmet>
      <title>Email Sign Up | Number</title>
    </Helmet>
    <Header backTo={routes.phoneLogin} title={'Email Sign Up'} />
    <ExtendedForm submitFn={onSubmit}>
      <ExtendedInput
        value={firstName}
        placeholder={'Enter firstName'}
        onChange={onChange}
        name={'firstName'}
      />
      <ExtendedInput
        value={lastName}
        placeholder={'Enter lastName'}
        onChange={onChange}
        name={'lastName'}
      />
      <ExtendedInput
        value={email}
        placeholder={'Enter email'}
        onChange={onChange}
        name={'email'}
      />
      <ExtendedInput
        value={password}
        placeholder={'Enter password'}
        onChange={onChange}
        name={'password'}
        type={'password'}
      />
      <ExtendedInput
        value={profilePhoto}
        placeholder={'Enter profilePhoto'}
        onChange={onChange}
        name={'profilePhoto'}
      />
      <ExtendedInput
        value={age}
        placeholder={'Enter age'}
        onChange={onChange}
        name={'age'}
      />
      <ExtendedInput
        value={phoneNumber}
        placeholder={'Enter phoneNumber'}
        onChange={onChange}
        name={'phoneNumber'}
      />
      <Button
        disabled={loading}
        value={loading ? 'Verifying' : 'Submit'}
        onClick={null}
      />
    </ExtendedForm>
  </Container>
);

export default EmailSignUpPresenter;
