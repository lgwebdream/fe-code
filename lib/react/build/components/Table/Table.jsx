import React, { useMemo, useState } from 'react';
import { Table } from 'antd';
import classNames from 'classnames';
import { useFetchData, parseDefaultColumnConfig } from './utils';
const CrudTable = (props) => {
    const { className: propsClassName, pagination: propsPagination, columns: propsColumns, onRequestError, request, defaultData, params = {}, defaultClassName, ...restProps } = props;
    const className = useMemo(() => {
        return classNames(defaultClassName, propsClassName);
    }, [defaultClassName, propsClassName]);
    const { sort, filter } = parseDefaultColumnConfig(propsColumns);
    const defaultPagination = typeof propsPagination === 'object'
        ? propsPagination
        : { defaultCurrent: 1, defaultPageSize: 20, pageSize: 20, current: 1 };
    const [fetchPagination, setPageInfo] = useState(defaultPagination);
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
        effects: [JSON.stringify(params)],
        onPageInfoChange: pageInfo => {
            if (propsPagination) {
                propsPagination?.onChange?.(pageInfo.current, pageInfo.pageSize);
            }
        },
    });
    /** 合并外置props,只接管业务逻辑，对其他属性只做代理 */
    const getTableProps = () => ({
        ...restProps,
        className,
        loading: action.loading,
        dataSource: action.dataSource,
        columns: propsColumns,
        onChange: (changePagination, filters, sorter, extra) => {
            restProps.onChange?.(changePagination, filters, sorter, extra);
            setPageInfo(changePagination);
        },
    });
    return <Table {...getTableProps()} className={className}/>;
};
CrudTable.defaultProps = {
    defaultClassName: 'crud-table',
};
export default CrudTable;
