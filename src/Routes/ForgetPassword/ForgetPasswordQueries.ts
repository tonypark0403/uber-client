import { gql } from 'apollo-boost';

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($email: String!, $password: String!) {
    UpdatePassword(email: $email, password: $password) {
      ok
      error
    }
  }
`;
