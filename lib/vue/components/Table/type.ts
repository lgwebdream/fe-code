export interface TableDataItem {
  date: string;
  name: string;
  address: string;
}

export interface TableColumnItem {
  prop: string;
  label: string;
  width?: string | number;
  'min-width'?: string | number;
  align?: 'left' | 'center' | 'right';
}
