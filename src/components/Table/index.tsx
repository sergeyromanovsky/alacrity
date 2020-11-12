import React from 'react';
import { DataGrid, ColDef, GridComponentProps, ColParams } from '@material-ui/data-grid';
import { Wrapper } from './styled';

interface IProps {
  data: GridComponentProps['rows'];
  columns: ColDef[];
  onRowSelected: GridComponentProps['onRowSelected'];
}

const PER_PAGE_OPTIONS = [10, 25, 50, 100];

function Table({ data, ...rest }: IProps) {
  const handleColumnClick = ({ field, api }: ColParams) => {
    if (field === '__check__') {
      console.log('api', api.state);
    }
  };
  return (
    <Wrapper>
      <DataGrid
        checkboxSelection
        {...rest}
        rows={data}
        rowsPerPageOptions={PER_PAGE_OPTIONS}
        onColumnHeaderClick={handleColumnClick}
        disableSelectionOnClick
      />
    </Wrapper>
  );
}

export default Table;
