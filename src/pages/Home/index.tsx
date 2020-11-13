import React, { useCallback, useMemo, useState } from 'react';
import Table from 'components/Table';
import Loader from 'components/Loader';
import BookDialog from 'pages/Home/BookDialog';
import AddIcon from '@material-ui/icons/Add';

import { useMutation, useQuery } from '@apollo/client';
import { GET_BOOKS } from 'gql/book/get-books';
import { GetBooks, GetBooks_books } from 'gql/book/__generated__/GetBooks';
import { ColDef, ColParams, RowSelectedParams } from '@material-ui/data-grid';
import { StyledButton, StyledEditIcon, Wrapper } from './styled';
import { Book } from 'gql/book/__generated__/Book';
import { IProps as BookDialogProps } from './BookDialog';
import { EDIT_BOOK } from 'gql/book/edit-book';
import { EditBook, EditBookVariables } from 'gql/book/__generated__/EditBook';
import { CREATE_BOOK } from 'gql/book/create-book';
import { CreateBook, CreateBookVariables } from 'gql/book/__generated__/CreateBook';
import { IFormValues } from './BookDialog';
import { toast } from 'react-toastify';

type IDialogMeta = Omit<BookDialogProps, 'onClose'>;

export const CREATE_BOOK_BUTTON_TEST_ID = 'create-book-button';

function Home() {
  const { data } = useQuery<GetBooks>(GET_BOOKS);
  const [dialogMeta, setDialogMeta] = useState<IDialogMeta | null>(null);
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [editBook] = useMutation<EditBook, EditBookVariables>(EDIT_BOOK);
  const [createBook] = useMutation<CreateBook, CreateBookVariables>(CREATE_BOOK);

  const updatedBooks = useMemo(() => {
    const filtered = data?.books?.filter(Boolean) as GetBooks_books[];
    // id field is mandatory for @material/data-grid
    const booksWithId = filtered?.map((book) => ({
      ...book,
      id: book.bookId,
    }));
    return booksWithId;
  }, [data?.books]);

  const handleCreateBook = useCallback(() => {
    setDialogMeta({
      open: true,
      title: 'Create New Book',
      actionButtonTitle: 'Create',
      onSubmit: async ({ price, ...rest }: IFormValues) => {
        await createBook({
          variables: { ...rest, price: +price },
          update: (cache, { data }) => {
            if (data?.createBook) {
              toast.success(`${data.createBook.title} was successfully created !`);
              cache.modify({
                fields: {
                  books(existingBooks: Book[] = []) {
                    const updatedBooks = [data.createBook, ...existingBooks];
                    return updatedBooks;
                  },
                },
              });
              handleCloseDialog();
            }
          },
        });
      },
    });
  }, []);

  const columns: ColDef[] = useMemo(() => {
    const handleEditClick = (book: Book) => {
      setDialogMeta({
        open: true,
        initialValue: book,
        title: book.title,
        actionButtonTitle: 'Edit',
        onSubmit: async ({ price, ...rest }: IFormValues) => {
          await editBook({
            variables: { ...rest, price: +price, bookId: book.bookId },
            update: (cache, { data }) => {
              if (data?.editBook) {
                toast.success(`${data.editBook.title} was successfully edited !`);
                cache.modify({
                  fields: {
                    books(existingBooks: Book[] = []) {
                      const updatedBookIndex = existingBooks.findIndex(
                        ({ bookId }) => bookId === book.bookId
                      );
                      const updatedBooks = [...existingBooks];
                      updatedBooks.splice(updatedBookIndex, 1, data.editBook!);
                      return updatedBooks;
                    },
                  },
                });
                handleCloseDialog();
              }
            },
          });
        },
      });
    };
    return [
      { field: 'id', headerName: 'ID' },
      { field: 'title', headerName: 'Title', width: 300 },
      { field: 'author', headerName: 'Author', width: 250 },
      {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 90,
      },
      {
        field: 'edit',
        headerName: 'Edit',
        width: 90,
        sortable: false,
        renderCell: ({ data }) => (
          <StyledEditIcon onClick={() => handleEditClick((data as unknown) as Book)} />
        ),
      },
    ];
  }, []);

  const handleCloseDialog = useCallback(() => setDialogMeta(null), []);

  const calculatedPrice = useMemo(() => selectedBooks.reduce((acc, book) => acc + book.price, 0), [
    selectedBooks,
  ]);

  const handleCheckoxClicked = useCallback(({ data, isSelected }: RowSelectedParams) => {
    if (isSelected) {
      setSelectedBooks((prevState) => [...prevState, (data as unknown) as Book]);
    } else {
      setSelectedBooks((prevState) => prevState.filter((book) => book.bookId !== data.id));
    }
  }, []);

  const handleColumnClicked = useCallback(
    ({ field }: ColParams) => {
      if (field === '__check__') {
        // super weird thing, if I remove setTimeout all checkboxes will not render properly,
        // but if I remove entire function, everything will work as expected
        setTimeout(
          () => setSelectedBooks((prevState) => (prevState.length === 0 ? [...updatedBooks!] : [])),
          0
        );
      }
    },
    [updatedBooks]
  );

  if (!updatedBooks) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <StyledButton
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={handleCreateBook}
        data-testid={CREATE_BOOK_BUTTON_TEST_ID}
      >
        Create Book
      </StyledButton>
      <Table
        data={updatedBooks}
        columns={columns}
        onRowSelected={handleCheckoxClicked}
        onColumnHeaderClick={handleColumnClicked}
        footerChildren={
          <>
            <div>
              Selected: <strong>{selectedBooks.length}</strong>
            </div>
            <div>
              Total Price: <strong>{calculatedPrice.toFixed(2)}</strong>
            </div>
          </>
        }
      />
      {dialogMeta && <BookDialog onClose={handleCloseDialog} {...dialogMeta!} />}
    </Wrapper>
  );
}

export default Home;
