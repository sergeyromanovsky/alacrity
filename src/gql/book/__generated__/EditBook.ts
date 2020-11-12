/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditBook
// ====================================================

export interface EditBook_editBook {
  bookId: number;
  title: string;
  author: string;
  price: number;
}

export interface EditBook {
  editBook: EditBook_editBook | null;
}

export interface EditBookVariables {
  bookId: number;
  title: string;
  author: string;
  price: number;
}
