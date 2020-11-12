import { gql } from '@apollo/client';
import { BOOK_FRAGMENT } from './book.fragment';

export const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $author: String!, $price: Float!) {
    createBook(title: $title, author: $author, price: $price) {
      ...Book
    }
  }
  ${BOOK_FRAGMENT}
`;
