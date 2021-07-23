import React, { useMemo, useState } from 'react';
import Table from './Table';
import ToolBar from './ToolBar';
import Form from './Form';
import { ICrud, ICrudColumn } from './Crud.d';
import { BatchButtonGroup } from './ToolBar/BatchOperation';

const FCrud = (props: ICrud): React.ReactElement => {
  const { columns, tableProps, batchToolbar, rowToolbar, request } = props;
  const [filter, setFilter] = useState(null);
  const [selection, setSelection] = useState({
    selectedRows: [],
    selectedRowKeys: [],
  });

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

  // 表格自动处理
  const tableColumns = useMemo(() => {
    const buffer: ICrudColumn[] = [];

    columns.forEach(it => {
      const temp = { ...it };
      buffer.push(temp);
    });

    if (rowToolbar) {
      buffer.push({
        title: '操作',
        width: 200,
        dataIndex: 'operation',
        render: (text, row, index: number) => {
          return (
            <BatchButtonGroup
              options={rowToolbar}
              args={{ row, rowKey: index }}
            />
          );
        },
      } as ICrudColumn);
    }

    return buffer;
  }, [columns, rowToolbar]);

  return (
    <div className="f-crud">
      <ToolBar
        selectedRows={selection.selectedRows}
        selectedRowKeys={selection.selectedRowKeys}
        batchOptions={batchToolbar}
        searchOptions={{
          columns: filterColumns,
          onSearch: onSearchFilter,
          onReset: onResetFilter,
        }}
      />
      <Table
        rowSelection={{
          columnWidth: 60,
          type: 'checkbox',
          onChange: (
            selectedRowKeys: React.Key[],
            selectedRows: Record<string, any>[],
          ) => setSelection({ selectedRows, selectedRowKeys }),
        }}
        {...tableProps}
        request={request}
        columns={tableColumns}
        params={filter}
      />
    </div>
  );
};

FCrud.Table = Table;
FCrud.ToolBar = ToolBar;
FCrud.Form = Form;

export default FCrud;
