import React from 'react';
import {
  Button,
  Dialog as MaterialDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

export interface IProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
  actionButtonTitle?: string;
  testId?: string;
}

export const ACTION_BUTTON_TEST_ID = 'action-button';

function Dialog({
  open,
  onClose,
  title,
  actionButtonTitle = 'Edit',
  onSubmit,
  children,
  testId,
}: IProps) {
  return (
    <MaterialDialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      // @ts-expect-error
      PaperProps={{ 'data-testid': testId }}
    >
      <form onSubmit={onSubmit as any}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            data-testid={ACTION_BUTTON_TEST_ID}
          >
            {actionButtonTitle}
          </Button>
        </DialogActions>
      </form>
    </MaterialDialog>
  );
}

export default Dialog;
