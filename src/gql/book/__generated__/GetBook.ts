/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBook
// ====================================================

export interface GetBook_book {
  bookId: number;
  title: string;
  author: string;
  price: number;
}

export interface GetBook {
  book: GetBook_book | null;
}

export interface GetBookVariables {
  bookId: number;
}
