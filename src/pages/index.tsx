import React, { useCallback, useMemo, useState } from 'react';
import Table from 'components/Table';
import Loader from 'components/Loader';
import BookDialog from './BookDialog';
import AddIcon from '@material-ui/icons/Add';

import { useQuery } from '@apollo/client';
import { GET_BOOKS } from 'gql/book/get-books';
import { GetBooks, GetBooks_books } from 'gql/book/__generated__/GetBooks';
import { ColDef, RowSelectedParams } from '@material-ui/data-grid';
import { StyledButton, StyledEditIcon, Wrapper } from './styled';
import { Book } from 'gql/book/__generated__/Book';
import { IProps as BookDialogProps } from './BookDialog';

type IDialogMeta = Omit<BookDialogProps, 'onClose' | 'open'>;

function App() {
  const { data } = useQuery<GetBooks>(GET_BOOKS);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMeta, setDialogMeta] = useState<IDialogMeta | null>(null);

  const handleCloseDialog = useCallback(() => setShowDialog(false), []);

  const handleCreateBook = useCallback(() => {
    setShowDialog(true);
    setDialogMeta({
      title: 'Create New Book',
      actionButtonTitle: 'Create',
      onSubmit: (val: any) => console.log(val),
    });
  }, []);

  const columns: ColDef[] = useMemo(() => {
    const handleEditClick = (book: Book) => {
      setShowDialog(true);
      setDialogMeta({
        initialValue: book,
        title: book.title,
        actionButtonTitle: 'Edit',
        onSubmit: (val: any) => console.log(val),
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
        renderCell: ({ data }) => (
          <StyledEditIcon onClick={() => handleEditClick((data as unknown) as Book)} />
        ),
      },
    ];
  }, []);

  const updatedBooks = useMemo(() => {
    return (
      data?.books
        ?.filter(Boolean)
        // id field is mandatory for Data-Grid Material component
        .map((book) => ({ ...(book as GetBooks_books), id: book!.bookId }))
    );
  }, [data?.books]);

  if (!updatedBooks) {
    return <Loader />;
  }

  const handleCheckoxClicked = ({ data, isSelected }: RowSelectedParams) => {
    console.log(data);
  };

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
      <Table data={updatedBooks} columns={columns} onRowSelected={handleCheckoxClicked} />
      <BookDialog open={showDialog} onClose={handleCloseDialog} {...dialogMeta!} />
    </Wrapper>
  );
}

export default App;
