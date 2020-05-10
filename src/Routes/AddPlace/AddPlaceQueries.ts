import { gql } from 'apollo-boost';

export const ADD_PLACE = gql`
  mutation addPlace(
    $name: String!
    $lat: Float!
    $lng: Float!
    $address: String!
    $isFaverite: Boolean!
  ) {
    AddPlace(
      name: $name
      lat: $lat
      lng: $lng
      address: $address
      isFaverite: $isFaverite
    ) {
      ok
      error
    }
  }
`;
