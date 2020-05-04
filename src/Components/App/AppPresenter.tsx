import PropTypes from 'prop-types';
import React from 'react';
// import styled from '../Style/typed-components';

// const Thing =  styled.div`
//     background: ${props => props.theme.primaryColor} // typescript는 위와 같이 theme이 모가 있는지 다 보여줌
// `;

interface IProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) =>
  isLoggedIn ? <span>"You are in"</span> : <span>"You are out"</span>;

AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppPresenter;
