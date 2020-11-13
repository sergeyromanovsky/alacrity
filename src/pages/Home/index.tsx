import React, { useCallback, useMemo, useState } from 'react';
import Table from 'components/Table';
import Loader from 'components/Loader';
import BookDialog from 'pages/Home/BookDialog';
import AddIcon from '@material-ui/icons/Add';

import { useQuery } from '@apollo/client';
import { GET_BOOKS } from 'gql/book/get-books';
import { GetBooks, GetBooks_books } from 'gql/book/__generated__/GetBooks';
import { ColDef, ColParams, RowSelectedParams } from '@material-ui/data-grid';
import { StyledButton, StyledEditIcon, Wrapper } from './styled';
import { Book } from 'gql/book/__generated__/Book';
import { IProps as BookDialogProps } from './BookDialog';

type IDialogMeta = Omit<BookDialogProps, 'onClose'>;

function Home() {
  const { data } = useQuery<GetBooks>(GET_BOOKS);
  const [dialogMeta, setDialogMeta] = useState<IDialogMeta | null>(null);
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);

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
      onSubmit: (val: any) => console.log(val),
    });
  }, []);

  const columns: ColDef[] = useMemo(() => {
    const handleEditClick = (book: Book) => {
      setDialogMeta({
        open: true,
        initialValue: book,
        title: book.title,
        actionButtonTitle: 'Edit',
        onSubmit: (val: any) => console.log('submit', val),
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
