import React from 'react';
import { TextFieldProps } from '@material-ui/core';
import { StyledTextField } from './styled';
import { FieldError, get } from 'react-hook-form';

type IProps = TextFieldProps & {
  errors?: FieldError | {};
  name: string;
};

function Input({ errors = {}, ...props }: IProps) {
  return (
    <StyledTextField
      {...props}
      error={Boolean(get(errors, props.name))}
      helperText={get(errors, props.name)?.message || ''}
    />
  );
}

export default Input;
