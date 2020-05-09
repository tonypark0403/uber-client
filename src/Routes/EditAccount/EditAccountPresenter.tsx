import React from 'react';
import { Helmet } from 'react-helmet';
import PhotoInput from '../../Components/PhotoInput';
import Button from '../../Components/Button';
import Form from '../../Components/Form';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import styled from '../../Components/Style/typed-components';

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

interface IProps {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  onSubmit: any;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  // uploaded: boolean;
  uploading: boolean;
}

const EditAccountPresenter: React.FC<IProps> = ({
  firstName,
  lastName,
  email,
  onSubmit,
  profilePhoto,
  onInputChange,
  loading,
  // uploaded,
  uploading,
}) => (
  <Container>
    <Helmet>
      <title>Edit Account | Number</title>
    </Helmet>
    <Header title={'Edit Account'} backTo={'/'} />
    <ExtendedForm submitFn={onSubmit}>
      <PhotoInput
        // uploaded={uploaded}
        uploading={uploading}
        fileUrl={profilePhoto}
        onChange={onInputChange}
      />
      <ExtendedInput
        onChange={onInputChange}
        type={'text'}
        value={firstName}
        placeholder={'First name'}
        name={'firstName'}
      />
      <ExtendedInput
        onChange={onInputChange}
        type={'text'}
        value={lastName}
        placeholder={'Last name'}
        name={'lastName'}
      />
      <ExtendedInput
        onChange={onInputChange}
        type={'email'}
        value={email}
        placeholder={'Email'}
        name={'email'}
      />
      <Button onClick={null} value={loading ? 'Loading' : 'Update'} />
    </ExtendedForm>
  </Container>
);

export default EditAccountPresenter;
