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
}

function Dialog({ open, onClose, title, actionButtonTitle = 'Edit', onSubmit, children }: IProps) {
  return (
    <MaterialDialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <form onSubmit={onSubmit as any}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained">
            {actionButtonTitle}
          </Button>
        </DialogActions>
      </form>
    </MaterialDialog>
  );
}

export default Dialog;
