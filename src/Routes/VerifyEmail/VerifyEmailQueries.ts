import { gql } from 'apollo-boost';

export const VERIFY_EMAIL = gql`
  mutation verifyEmail($verificationKey: String!) {
    CompleteEmailVerification(key: $verificationKey) {
      ok
      error
    }
  }
`;
