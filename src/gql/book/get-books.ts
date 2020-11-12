import { gql } from '@apollo/client';
import { BOOK_FRAGMENT } from './book.fragment';

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      ...Book
    }
  }
  ${BOOK_FRAGMENT}
`;
