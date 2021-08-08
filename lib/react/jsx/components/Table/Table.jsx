import React, { useMemo, useState, useRef, useEffect, useCallback, } from 'react';
import { Table } from 'antd';
import classNames from 'classnames';
import { useFetchData, parseDefaultColumnConfig } from './utils';
import { useActionType } from './hooks/useActionType';
const CrudTable = (props) => {
    const { className: propsClassName, pagination: propsPagination, columns: propsColumns, actionRef: propsActionRef, rowSelection: propsRowSelection = false, onRequestError, request, defaultData, params = {}, defaultClassName, ...restProps } = props;
    const className = useMemo(() => {
        return classNames(defaultClassName, propsClassName);
    }, [defaultClassName, propsClassName]);
    /** 操作子节点的工具类 */
    const actionRef = useRef();
    const rootRef = useRef(null);
    const [filter, setFilter] = useState({});
    const [sort, setSort] = useState({});
    /** 设置默认排序和筛选值 */
    useEffect(() => {
        const { sort: propsSort, filter: propsFilter } = parseDefaultColumnConfig(propsColumns);
        setFilter(propsFilter);
        setSort(propsSort);
    }, []);
    useEffect(() => {
        if (typeof propsActionRef === 'function' && actionRef.current) {
            propsActionRef(actionRef.current);
        }
    }, [propsActionRef]);
    const defaultPagination = typeof propsPagination === 'object'
        ? propsPagination
        : { defaultCurrent: 1, defaultPageSize: 10, pageSize: 10, current: 1 };
    const [fetchPagination, setPageInfo] = useState(defaultPagination);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    /** 清空所有的选中项 */
    const onCleanSelected = useCallback(() => {
        if (propsRowSelection && propsRowSelection.onChange) {
            propsRowSelection.onChange([], []);
        }
        setSelectedRowKeys([]);
    }, [propsRowSelection]);
    /** 行选择统一配置入口 */
    const rowSelection = {
        selectedRowKeys,
        ...propsRowSelection,
        onChange: (keys, rows) => {
            if (propsRowSelection && propsRowSelection.onChange) {
                propsRowSelection.onChange(keys, rows);
            }
            setSelectedRowKeys(keys);
        },
    };
    /** 列表页刷新请求统一入口 */
    const fetchData = useMemo(() => {
        if (!request)
            return undefined;
        return async (pageParams) => {
            /** 合并table额外的params, eg：表单联动 */
            const actionParams = {
                ...(pageParams || {}),
                ...params,
            };
            const response = await request(actionParams, sort, filter);
            return response;
        };
    }, [params, filter, sort, request]);
    /** 收集组件触发请求的action, 内建业务模块代码 */
    const action = useFetchData(fetchData, defaultData, {
        pageInfo: fetchPagination,
        dataSource: props.dataSource,
        onRequestError,
        effects: [JSON.stringify(params), JSON.stringify(sort)],
        onPageInfoChange: pageInfo => {
            if (propsPagination) {
                propsPagination?.onChange?.(pageInfo.current, pageInfo.pageSize);
            }
        },
    });
    /** 分页组件切换逻辑统一入口 */
    const pagination = useMemo(() => {
        return {
            ...action.pageInfo,
            setPageInfo: ({ pageSize, current }) => {
                action.setPageInfo({ pageSize, current });
            },
        };
    }, [propsPagination, action]);
    /** 绑定action，可以手动操作table */
    useActionType(actionRef, action, {
        onCleanSelected: () => {
            // 清空选中行
            onCleanSelected();
        },
    });
    if (propsActionRef) {
        // @ts-ignore
        propsActionRef.current = actionRef.current;
    }
    /** 合并外置props,只接管业务逻辑，对其他属性只做代理 */
    const getTableProps = () => ({
        ...restProps,
        className,
        pagination,
        loading: action.loading,
        dataSource: action.dataSource,
        rowSelection,
        columns: propsColumns,
        onChange: (changePagination, filters, sorter, extra) => {
            restProps.onChange?.(changePagination, filters, sorter, extra);
            setPageInfo(changePagination);
            setSort(sorter);
        },
    });
    return (<div ref={rootRef}>
      <Table {...getTableProps()} className={className}/>
    </div>);
};
CrudTable.defaultProps = {
    defaultClassName: 'crud-table',
};
export default CrudTable;
