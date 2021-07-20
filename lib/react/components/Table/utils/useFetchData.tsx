import { useState, useEffect } from 'react';
import { FetcherResult } from '../../../service';
import { UseFetchActions } from '../typing';

/** 组合用户的配置和默认值 */
const mergeActionAndPageInfo = ({ pageInfo }: UseFetchActions) => {
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
  actions: UseFetchActions,
) => {
  const [list, setList] = useState([]);
  const [pageInfo, setPageInfo] = useState(
    mergeActionAndPageInfo({ pageInfo: actions.pageInfo }),
  );

  const fetchList = async () => {
    const pageParams = mergeActionAndPageInfo({ pageInfo: actions.pageInfo });
    const data = await getData(pageParams);
    return data;
  };

  useEffect(() => {
    fetchList().then(res => {
      setList(res.data.data);
    });
  }, []);

  return {
    dataSource: list,
    pageInfo,
    setPageInfo: async info => {
      setPageInfo({
        ...pageInfo,
        ...info,
      });
    },
  };
};

export default useFetchData;
