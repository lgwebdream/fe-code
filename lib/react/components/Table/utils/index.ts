import type { ColumnType, SortOrder } from 'antd/lib/table/interface';

export { default as useFetchData } from './useFetchData';

function parseDataIndex(
  dataIndex: ColumnType<'string'>['dataIndex'],
): string | undefined {
  if (Array.isArray(dataIndex)) {
    return dataIndex.join(',');
  }
  return dataIndex?.toString();
}

export function parseDefaultColumnConfig<T>(columns: ColumnType<T>[]) {
  const filter: Record<string, React.ReactText[] | null> = {};
  const sort: Record<string, SortOrder> = {};
  columns.forEach(column => {
    // 转换 dataIndex
    const dataIndex = parseDataIndex(column.dataIndex);
    if (!dataIndex) {
      return;
    }
    // 当 column 启用 filters 功能时，取出默认的筛选值
    if (column.filters) {
      const defaultFilteredValue =
        column.defaultFilteredValue as React.ReactText[];
      if (defaultFilteredValue === undefined) {
        filter[dataIndex] = null;
      } else {
        filter[dataIndex] = column.defaultFilteredValue as React.ReactText[];
      }
    }
    // 当 column 启用 sorter 功能时，取出默认的排序值
    if (column.sorter && column.defaultSortOrder) {
      sort[dataIndex] = column.defaultSortOrder!;
    }
  });
  return { sort, filter };
}
