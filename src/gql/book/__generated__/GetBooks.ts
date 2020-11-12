/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBooks
// ====================================================

export interface GetBooks_books {
  bookId: number;
  title: string;
  author: string;
  price: number;
}

export interface GetBooks {
  books: (GetBooks_books | null)[] | null;
}
