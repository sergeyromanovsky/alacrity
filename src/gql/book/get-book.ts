import { gql } from '@apollo/client';
import { BOOK_FRAGMENT } from './book.fragment';

export const GET_BOOK = gql`
  query GetBook($bookId: Int!) {
    book(bookId: $bookId) {
      ...Book
    }
  }
  ${BOOK_FRAGMENT}
`;
