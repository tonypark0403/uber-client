import { gql } from 'apollo-boost';

export const VERIFY_PHONE = gql`
  mutation verifyPhone($verificationKey: String!, $phoneNumber: String!) {
    CompletePhoneVerification(
      key: $verificationKey
      phoneNumber: $phoneNumber
    ) {
      ok
      error
      token
    }
  }
`;
