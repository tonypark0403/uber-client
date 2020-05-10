import { gql } from 'apollo-boost';

export const EDIT_PLACE = gql`
  mutation editPlace($placeId: Int!, $isFaverite: Boolean) {
    EditPlace(placeId: $placeId, isFaverite: $isFaverite) {
      ok
      error
    }
  }
`;

export const DELETE_PLACE = gql`
  mutation deletePlace($placeId: Int!) {
    DeletePlace(placeId: $placeId) {
      ok
      error
    }
  }
`;
