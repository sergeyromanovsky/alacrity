/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateBook
// ====================================================

export interface CreateBook_createBook {
  bookId: number;
  title: string;
  author: string;
  price: number;
}

export interface CreateBook {
  createBook: CreateBook_createBook | null;
}

export interface CreateBookVariables {
  title: string;
  author: string;
  price: number;
}
