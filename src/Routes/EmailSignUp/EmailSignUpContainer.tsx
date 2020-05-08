import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import EmailSignUpPresenter from './EmailSignUpPresenter';
import { useMutation } from 'react-apollo';
import { EMAIL_SIGNUP } from './EmailSignUpQueries';
import { toast } from 'react-toastify';
import { LOG_USER_IN } from '../../sharedQueries';
import routes from '../../config/routes';

type PhoneState = {
  phone: string; // which is coming from PhoneLoginContainer
};

export interface StaticContext {
  statusCode?: number;
}

interface IProps extends RouteComponentProps<{}, StaticContext, PhoneState> {
  location: any;
}

const EmailSignUpContainer = (props: IProps) => {
  let phone;
  if (!props.location.state) {
    props.history.push('/');
  } else {
    phone = props.location.state.phone;
  }

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(
    'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon'
  );
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(phone);

  const [logUserIn] = useMutation(LOG_USER_IN);
  const [emailSignUp, { loading }] = useMutation(EMAIL_SIGNUP, {
    variables: {
      firstName,
      lastName,
      email,
      password,
      profilePhoto,
      age: Number(age),
      phoneNumber,
    },
    onCompleted: (data) => {
      const { EmailSignUp } = data;
      if (EmailSignUp.ok) {
        logUserIn({
          variables: {
            token: EmailSignUp.token,
          },
        });
        toast.success("You're verified, logging in now");
      } else if (EmailSignUp.error === 'The user is already signed up') {
        toast.info("You're already signed up, please sign in");
        setTimeout(() => {
          props.history.push({
            pathname: routes.emailSignIn,
          });
        }, 2000);
      } else {
        toast.error(EmailSignUp.error);
      }
    },
  });

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'profilePhoto':
        setProfilePhoto(value);
        break;
      case 'age':
        setAge(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
    }
  };

  return (
    <EmailSignUpPresenter
      loading={loading}
      onSubmit={emailSignUp}
      onChange={onInputChange}
      firstName={firstName}
      lastName={lastName}
      email={email}
      password={password}
      profilePhoto={profilePhoto}
      age={age}
      phoneNumber={phoneNumber}
    />
  );
};

export default EmailSignUpContainer;
