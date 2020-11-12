import { gql } from '@apollo/client';
import { BOOK_FRAGMENT } from './book.fragment';

export const EDIT_BOOK = gql`
  mutation EditBook($bookId: Int!, $title: String!, $author: String!, $price: Float!) {
    editBook(bookId: $bookId, title: $title, author: $author, price: $price) {
      ...Book
    }
  }
  ${BOOK_FRAGMENT}
`;
