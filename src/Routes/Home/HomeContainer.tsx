import React from 'react';
import { RouteComponentProps } from 'react-router';
import HomePresenter from './HomePresenter';

interface IState {
  isMenuOpen: boolean;
}

interface IProps extends RouteComponentProps<any> {}

class HomeContainer extends React.Component<IProps, IState> {
  state = {
    isMenuOpen: false,
  };

  toggleMenu = () => {
    this.setState((state) => {
      return {
        isMenuOpen: !state.isMenuOpen,
      };
    });
  };

  public render() {
    const { isMenuOpen } = this.state;
    return (
      <HomePresenter isMenuOpen={isMenuOpen} toggleMenu={this.toggleMenu} />
    );
  }
}

export default HomeContainer;
