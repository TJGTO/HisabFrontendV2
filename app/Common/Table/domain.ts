export type TableHeadObj = {
  id: number;
  label: string;
};

export type TableProps = {
  tablehead: Array<TableHeadObj>;
  tablerows: Array<JSX.Element>;
};

export interface IFooterProps {
  page: number;
  pageSize: number;
  totalPages: number;
  setpage: React.Dispatch<React.SetStateAction<number>>;
}
