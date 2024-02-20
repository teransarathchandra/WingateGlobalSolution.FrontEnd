export interface IColumn {
  id: string;
  label: string;
  numeric?: boolean;
  disablePadding?: boolean;
}

export interface IRow {
  id: string;
  [key: string]: any; // Allows for any number of properties of any type
}

export interface ITableProps {
  columns: IColumn[];
  rows: IRow[];
  title: string;
  rowKey: string; // Unique identifier for rows
  onRowSelect?: (selectedRows: IRow[]) => void; // Optional row select handler
}
