import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
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

const LoginWay = styled.div`
  padding: 10px 40px;
`;

const LoginLink = styled.span`
  color: ${(props) => props.theme.blueColor};
  font-size: 20px;
  cursor: pointer;
`;

interface IProps {
  email: string;
  password: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: any;
  loading: boolean;
}

const EmailSignInPresenter: React.FC<IProps> = ({
  email,
  password,
  onChange,
  onSubmit,
  loading,
}) => (
  <Container>
    <Helmet>
      <title>Email Sign In | Number</title>
    </Helmet>
    <Header backTo={routes.phoneLogin} title={'Email Sign In'} />
    <ExtendedForm submitFn={onSubmit}>
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
      <Button
        disabled={loading}
        value={loading ? 'Verifying' : 'Submit'}
        onClick={null}
      />
    </ExtendedForm>
    <LoginWay>
      <Link to={routes.forgetPassword}>
        <LoginLink>Forget Password</LoginLink>
      </Link>
    </LoginWay>
  </Container>
);

export default EmailSignInPresenter;
