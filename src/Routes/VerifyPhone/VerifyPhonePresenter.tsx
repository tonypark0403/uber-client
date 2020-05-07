import React from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../Components/Button';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import styled from '../../Components/Style/typed-components';
import Form from '../../Components/Form';

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface IProps {
  verificationKey: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: any;
  loading: boolean;
}

const VerifyPhonePresenter: React.FC<IProps> = ({
  verificationKey,
  onChange,
  onSubmit,
  loading,
}) => (
  <Container>
    <Helmet>
      <title>Verify Phone | Number</title>
    </Helmet>
    <Header backTo={'/phone-login'} title={'Verify Phone Number'} />
    <ExtendedForm submitFn={onSubmit}>
      <ExtendedInput
        value={verificationKey}
        placeholder={'Enter Verification Code'}
        onChange={onChange}
        name={'verificationKey'}
      />
      <Button
        disabled={loading}
        value={loading ? 'Verifying' : 'Submit'}
        onClick={null}
      />
    </ExtendedForm>
  </Container>
);

export default VerifyPhonePresenter;
