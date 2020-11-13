import React from 'react';
import { DataGrid, ColDef, GridComponentProps } from '@material-ui/data-grid';
import { Wrapper, FooterWrapper } from './styled';

interface IProps {
  data: GridComponentProps['rows'];
  columns: ColDef[];
  onRowSelected: GridComponentProps['onRowSelected'];
  onColumnHeaderClick: GridComponentProps['onColumnHeaderClick'];
  footerChildren: React.ReactNode;
}

function Table({ data, footerChildren, ...rest }: IProps) {
  return (
    <Wrapper>
      <DataGrid
        checkboxSelection
        {...rest}
        rows={data}
        disableSelectionOnClick
        disableColumnResize
        components={{
          footer: () => <FooterWrapper>{footerChildren}</FooterWrapper>,
        }}
      />
    </Wrapper>
  );
}

export default Table;
