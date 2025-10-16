import { gql } from '@apollo/client';

export const COUNT_INCREMENT = gql`
  mutation CountIncrement($count: Int!) {
    countIncrement(count: $count) {
      count
    }
  }
`;

export const COUNT_DECREMENT = gql`
  mutation CountDecrement($count: Int!) {
    countDecrement(count: $count) {
      count
    }
  }
`;