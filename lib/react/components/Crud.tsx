import React, { useMemo, useState } from 'react';
import Table from './Table';
import ToolBar from './ToolBar';
import Form from './Form';
import { ICrud, ICrudColumn } from './Crud.d';

const FCrud = (props: ICrud): React.ReactElement => {
  const { columns, tableProps, batchToolbar, request } = props;
  const [filter, setFilter] = useState(null);

  const onSearchFilter = (params: {}) => setFilter(params);
  const onResetFilter = () => setFilter(null);

  // 格式化筛选表单字段属性
  const filterColumns = useMemo(() => {
    const buffer: ICrudColumn[] = [];
    columns.forEach(it => {
      if (it.isFilter) {
        const temp = { ...it };
        delete temp.rules;
        delete temp.isFilter;
        buffer.push(temp);
      }
    });
    return buffer;
  }, [columns]);

  return (
    <div className="f-crud">
      <ToolBar
        batchOptions={batchToolbar}
        searchOptions={{
          columns: filterColumns,
          onSearch: onSearchFilter,
          onReset: onResetFilter,
        }}
      />
      <Table
        {...tableProps}
        request={request}
        columns={columns}
        params={filter}
      />
    </div>
  );
};

FCrud.Table = Table;
FCrud.ToolBar = ToolBar;
FCrud.Form = Form;

export default FCrud;
