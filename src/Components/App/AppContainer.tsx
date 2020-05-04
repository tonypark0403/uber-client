import React from 'react';
import { graphql } from 'react-apollo';
import { IS_LOGGED_IN } from './AppQueries';
import AppPresenter from './AppPresenter';
import { ThemeProvider } from '../Style/typed-components';
import theme from '../Style/theme';
import GlobalStyle from '../Style/GlobalStyle';

const AppContainer = ({ data }: { data?: any }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
    </ThemeProvider>
  );
};

export default graphql(IS_LOGGED_IN)(AppContainer);
