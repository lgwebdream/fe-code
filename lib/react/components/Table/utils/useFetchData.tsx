import { useState, useEffect } from 'react';
import { ICrudListRequest } from '../../Crud.d';
import { UseFetchActions } from '../Table.d';

const useFetchData = <T extends Record<string, any>>(
  request: ICrudListRequest<T>,
  actions: UseFetchActions,
  params: Record<string, any>,
) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const pageParams = actions.pageInfo;
    const data = await request({ ...pageParams, ...params });
    return data;
  };

  useEffect(() => {
    fetchList().then(res => {
      // TODO 这里也可以获取到其他分页数据
      setList(res.rows);
    });
  }, [params]);

  return {
    dataSource: list,
  };
};

export default useFetchData;
