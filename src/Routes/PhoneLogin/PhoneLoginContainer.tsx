import React, { Component, ChangeEventHandler, FormEventHandler } from 'react';
import PhoneLoginPresenter from './PhoneLoginPresenter';
import { RouteComponentProps } from 'react-router-dom';

interface IState {
  countryCode: string;
  phoneNumber: string;
}

class PhoneLoginContainer extends Component<RouteComponentProps<any>, IState> {
  state = {
    countryCode: '+1',
    phoneNumber: '6471231234',
  };

  onInputChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (
    event
  ) => {
    const {
      target: { name, value },
    } = event;
    this.setState({
      [name]: value,
    } as any);
  };

  onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const { countryCode, phoneNumber } = this.state;
    // tslint:disable-next-line
    console.log(countryCode, phoneNumber);
  };

  public render() {
    const { countryCode, phoneNumber } = this.state;
    return (
      <PhoneLoginPresenter
        countryCode={countryCode}
        phoneNumber={phoneNumber}
        onInputChange={this.onInputChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default PhoneLoginContainer;
