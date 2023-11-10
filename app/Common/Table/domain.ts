export type TableHeadObj = {
  id: number;
  label: string;
};

export type TableProps = {
  tablehead: Array<TableHeadObj>;
  tablerows: Array<JSX.Element>;
};
