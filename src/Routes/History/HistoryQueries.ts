import { gql } from 'apollo-boost';

export const GET_HISTORY_RIDES = gql`
  query historyRides {
    HistoryRides {
      ok
      error
      rides {
        id
        status
        pickUpAddress
        dropOffAddress
        price
        distance
        duration
        driver {
          id
          fullName
          profilePhoto
        }
        passenger {
          id
          fullName
          profilePhoto
        }
        chatId
      }
    }
  }
`;
