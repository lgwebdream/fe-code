import { useState, useEffect } from 'react';
import { FetcherResult } from '../../../service';
import { UseFetchActions } from '../typing';

const useFetchData = <T extends FetcherResult<any>>(
  getData:
    | undefined
    | ((params?: { pageSize?: number; current?: number }) => Promise<T>),
  actions: UseFetchActions,
) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const pageParams = actions.pageInfo;
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
  };
};

export default useFetchData;
