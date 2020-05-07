import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import VerifyPhonePresenter from './VerifyPhonePresenter';

interface IState {
  key: string;
}

interface IProps extends RouteComponentProps<any> {}

class VerifyPhoneContainer extends React.Component<IProps, IState> {
  state = {
    key: '',
  };
  constructor(props: IProps) {
    super(props);
    if (!props.location.state) {
      props.history.push('/');
    }
  }

  onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { name, value },
    } = event;
    this.setState({
      [name]: value,
    } as any);
  };

  public render() {
    const { key } = this.state;
    return <VerifyPhonePresenter onChange={this.onInputChange} key={key} />;
  }
}

export default VerifyPhoneContainer;
