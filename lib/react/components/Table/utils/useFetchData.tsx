import { useState, useEffect } from 'react';
import { FetcherResult } from '../../../service';
import { UseFetchActions } from '../Table.d';
import usePrevious from '../hooks/usePrevious';

const mergeOptionAndPageInfo = ({ pageInfo }: UseFetchActions) => {
  if (pageInfo) {
    const { current, defaultCurrent, pageSize, defaultPageSize } = pageInfo;
    return {
      current: current || defaultCurrent || 1,
      total: 0,
      pageSize: pageSize || defaultPageSize || 20,
    };
  }
  return { current: 1, total: 0, pageSize: 20 };
};

const useFetchData = <T extends FetcherResult<any>>(
  getData:
    | undefined
    | ((params?: { pageSize?: number; current?: number }) => Promise<T>),
  defaultData: any[] | undefined,
  actions: UseFetchActions,
) => {
  const [list, setList] = useState([]);
  const [pageInfo, setPageInfo] = useState(
    mergeOptionAndPageInfo({ pageInfo: actions.pageInfo }),
  );

  const { effects = [] } = actions || {};
  // 缓存上一次的pageInfo 用于分页改变时查询列表
  const prePage = usePrevious(pageInfo?.current);
  const prePageSize = usePrevious(pageInfo?.pageSize);

  const fetchList = async () => {
    const { current, pageSize } = pageInfo;
    const pageParams =
      actions?.pageInfo !== false ? { current, pageSize } : undefined;

    const { data, code } = await getData(pageParams);
    if (code !== 200) setList([]);
    const responseData = data?.data;
    setList(responseData);
  };

  useEffect(() => {
    const { current, pageSize } = pageInfo || {};
    if (
      (!prePage || prePage === current) &&
      (!prePageSize || prePageSize === pageSize)
    ) {
      // eslint-disable-next-line no-useless-return
      return;
    }
    setPageInfo({ current, pageSize, total: list.length });
  }, [pageInfo?.current]);

  useEffect(() => {
    fetchList();
  }, [...effects]);

  return {
    dataSource: list,
  };
};

export default useFetchData;
