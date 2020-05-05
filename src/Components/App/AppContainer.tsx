import React from 'react';
import { graphql } from 'react-apollo';
import { IS_LOGGED_IN } from './AppQueries';
import AppPresenter from './AppPresenter';
import { ThemeProvider } from '../Style/typed-components';
import theme from '../Style/theme';
import GlobalStyle from '../Style/GlobalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const AppContainer = ({ data }: { data?: any }) => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
      </ThemeProvider>
      <ToastContainer draggable={true} position={'bottom-center'} />
    </React.Fragment>
  );
};

export default graphql(IS_LOGGED_IN)(AppContainer);
