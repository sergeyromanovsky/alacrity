import React, { ChangeEvent } from 'react';
import Dialog, { IProps as DialogProps } from 'components/Dialog';
import Input from 'components/FormControls/Input';

import { Book } from 'gql/book/__generated__/Book';
import { useForm, Controller } from 'react-hook-form';
import { Flex } from 'components/Flex/styled';
import { onlyNumbersAndDot } from 'utils/normalize';

export type IFormValues = Omit<Book, 'bookId'>;

const inputStyles = {
  marginRight: '1rem',
};

export const BOOK_DIALOG_TEST_ID = 'book-dialog';
export const AUTHOR_INPUT_TEST_ID = 'authour-input';
export const PRICE_INPUT_TEST_ID = 'price-input';
export const TITLE_INPUT_TEST_ID = 'title-input';

export interface IProps extends Omit<DialogProps, 'children' | 'onSubmit'> {
  initialValue?: IFormValues;
  onSubmit: (values: IFormValues) => void;
}

function BookForm({ initialValue, onSubmit, ...rest }: IProps) {
  const { register, handleSubmit, control, setValue, errors } = useForm<IFormValues>({
    defaultValues: initialValue,
  });

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue('price', onlyNumbersAndDot(e.target.value));

  return (
    <Dialog {...rest} onSubmit={handleSubmit(onSubmit)} testId={BOOK_DIALOG_TEST_ID}>
      <Flex style={{ marginBottom: '2rem' }}>
        <Input
          inputRef={register({ required: 'Required' })}
          variant="outlined"
          style={inputStyles}
          name="title"
          placeholder="Title"
          label="Title"
          errors={errors}
          InputProps={{ inputProps: { 'data-testid': TITLE_INPUT_TEST_ID } }}
        />
        <Input
          inputRef={register({ required: 'Required' })}
          variant="outlined"
          style={inputStyles}
          name="author"
          placeholder="Author"
          label="Author"
          errors={errors}
          InputProps={{ inputProps: { 'data-testid': AUTHOR_INPUT_TEST_ID } }}
        />
        <Controller
          name="price"
          control={control}
          defaultValue={initialValue?.price || ''}
          render={({ ref, ...rest }) => (
            <Input
              {...rest}
              inputRef={ref}
              onChange={handlePriceChange}
              variant="outlined"
              placeholder="Price"
              label="Price"
              errors={errors}
              InputProps={{ inputProps: { 'data-testid': PRICE_INPUT_TEST_ID } }}
            />
          )}
          rules={{ required: 'Required' }}
        />
      </Flex>
    </Dialog>
  );
}

export default BookForm;
