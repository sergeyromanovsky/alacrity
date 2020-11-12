import { gql } from '@apollo/client';

export const BOOK_FRAGMENT = gql`
  fragment Book on Book {
    bookId
    title
    author
    price
  }
`;
