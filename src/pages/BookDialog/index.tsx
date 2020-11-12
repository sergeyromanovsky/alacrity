import React from 'react';

import { Book } from 'gql/book/__generated__/Book';
import { useForm } from 'react-hook-form';
import Dialog, { IProps as DialogProps } from 'components/Dialog';

type IFormValues = Omit<Book, 'bookId'>;

export interface IProps extends Omit<DialogProps, 'children'> {
  initialValue?: IFormValues;
}

function BookForm({ initialValue, onSubmit, ...rest }: IProps) {
  const { register, handleSubmit } = useForm<IFormValues>({
    defaultValues: initialValue,
  });

  return (
    <Dialog {...rest} onSubmit={handleSubmit(onSubmit)}>
      <input type="text" ref={register({ required: 'Required' })} name="test" />
    </Dialog>
  );
}

export default BookForm;
