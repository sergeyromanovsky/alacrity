import React, { ChangeEvent } from 'react';
import Dialog, { IProps as DialogProps } from 'components/Dialog';
import Input from 'components/FormControls/Input';

import { Book } from 'gql/book/__generated__/Book';
import { useForm, Controller } from 'react-hook-form';
import { Flex } from 'components/Flex/styled';
import { onlyNumbersAndDot } from 'utils/normalize';

type IFormValues = Omit<Book, 'bookId'>;

const inputStyles = {
  marginRight: '1rem',
};
export interface IProps extends Omit<DialogProps, 'children'> {
  initialValue?: IFormValues;
}

function BookForm({ initialValue, onSubmit, ...rest }: IProps) {
  const { register, handleSubmit, control, setValue, errors } = useForm<IFormValues>({
    defaultValues: initialValue,
  });

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue('price', onlyNumbersAndDot(e.target.value));

  return (
    <Dialog {...rest} onSubmit={handleSubmit(onSubmit)}>
      <Flex style={{ marginBottom: '2rem' }}>
        <Input
          inputRef={register({ required: 'Required' })}
          variant="outlined"
          style={inputStyles}
          name="title"
          placeholder="Title"
          label="Title"
          errors={errors}
        />
        <Input
          inputRef={register({ required: 'Required' })}
          variant="outlined"
          style={inputStyles}
          name="author"
          placeholder="Author"
          label="Author"
          errors={errors}
        />
        <Controller
          name="price"
          control={control}
          render={(props: any) => (
            <Input
              {...props}
              onChange={handlePriceChange}
              variant="outlined"
              placeholder="Price"
              label="Price"
              errors={errors}
              name="price"
            />
          )}
          rules={{ required: 'Required' }}
        />
      </Flex>
    </Dialog>
  );
}

export default BookForm;
