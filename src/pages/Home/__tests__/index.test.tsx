import React from 'react';
import AppWrapper from 'wrapper';
import Home, { CREATE_BOOK_BUTTON_TEST_ID } from '..';
import fireEvent from '@testing-library/user-event';

import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import { GET_BOOKS } from 'gql/book/get-books';
import { LOADER_TEST_ID } from 'components/Loader';
import {
  AUTHOR_INPUT_TEST_ID,
  BOOK_DIALOG_TEST_ID,
  PRICE_INPUT_TEST_ID,
  TITLE_INPUT_TEST_ID,
} from '../BookDialog';
import { ACTION_BUTTON_TEST_ID } from 'components/Dialog';
import { act } from 'react-dom/test-utils';
import { CREATE_BOOK } from 'gql/book/create-book';

const NEW_BOOK_TITLE = 'Awesome book!';
const NEW_BOOK_AUTHOR = 'New Author';
const NEW_BOOK_PRICE = '10.99';
const NEW_BOOK_ID = 5000;

const newBook = {
  title: NEW_BOOK_TITLE,
  author: NEW_BOOK_AUTHOR,
  price: NEW_BOOK_PRICE,
};
const mocks = [
  {
    request: {
      query: GET_BOOKS,
    },
    result: {
      data: {
        books: [
          {
            author: 'Author',
            bookId: 1,
            price: 10.99,
            title: 'Awesome Book!',
            __typename: 'Book',
          },
          {
            author: 'Author2',
            bookId: 2,
            price: 10.99,
            title: 'Awesome Book!',
            __typename: 'Book',
          },
        ],
      },
    },
  },
  {
    request: {
      query: CREATE_BOOK,
      variables: { ...newBook, price: +NEW_BOOK_PRICE },
    },
    result: {
      data: {
        createBook: {
          ...newBook,
          __typename: 'Book',
          bookId: NEW_BOOK_ID,
        },
      },
    },
  },
];

describe('Home', () => {
  it('should show loader while fetching book list', () => {
    const { getByTestId } = render(
      <AppWrapper>
        <MockedProvider mocks={mocks}>
          <Home />
        </MockedProvider>
      </AppWrapper>
    );

    expect(getByTestId(LOADER_TEST_ID)).toBeInTheDocument();
  });

  it.skip('should render the fetched book list', async () => {
    const { getByText } = render(
      <AppWrapper>
        <MockedProvider mocks={mocks}>
          <Home />
        </MockedProvider>
      </AppWrapper>
    );

    await waitFor(() => {
      expect(getByText('Author')).toBeInTheDocument();
      expect(getByText('Autho2')).toBeInTheDocument();
    });
  });

  it("should open the book's dialog", async () => {
    const { getByTestId } = render(
      <AppWrapper>
        <MockedProvider mocks={mocks}>
          <Home />
        </MockedProvider>
      </AppWrapper>
    );
    await waitFor(() => {
      const createButton = getByTestId(CREATE_BOOK_BUTTON_TEST_ID);
      expect(createButton).toBeInTheDocument();
      fireEvent.click(createButton);
      expect(getByTestId(BOOK_DIALOG_TEST_ID)).toBeInTheDocument();
    });
  });

  it('should add new book to the list', async () => {
    const { getByTestId, getByText } = render(
      <AppWrapper>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      </AppWrapper>
    );
    await waitFor(() => {
      const createButton = getByTestId(CREATE_BOOK_BUTTON_TEST_ID);
      expect(createButton).toBeInTheDocument();
      fireEvent.click(createButton);
    });
    const authorInput = getByTestId(AUTHOR_INPUT_TEST_ID) as HTMLInputElement;
    const priceInput = getByTestId(PRICE_INPUT_TEST_ID) as HTMLInputElement;
    const titleInput = getByTestId(TITLE_INPUT_TEST_ID) as HTMLInputElement;

    if (!authorInput || !priceInput || !titleInput) {
      throw new Error('Input was not found');
    }

    fireEvent.type(authorInput, NEW_BOOK_AUTHOR);
    fireEvent.type(priceInput, NEW_BOOK_PRICE);
    fireEvent.type(titleInput, NEW_BOOK_TITLE);

    expect(authorInput.value).toBe(NEW_BOOK_AUTHOR);
    expect(priceInput.value).toBe(NEW_BOOK_PRICE);
    expect(titleInput.value).toBe(NEW_BOOK_TITLE);

    act(() => {
      fireEvent.click(getByTestId(ACTION_BUTTON_TEST_ID));
    });
    await waitFor(() => {
      expect(getByText(String(NEW_BOOK_ID))).toBeInTheDocument();
    });
  });
});
