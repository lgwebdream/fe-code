import { useState, useEffect } from 'react';
import {
  ICrudListRequest,
  ICrudListRequestSort,
  ICrudListRequestFilter,
} from '../..';
import { UseFetchActions } from '../typing';

const useFetchData = <T extends Record<string, any>>(
  request: ICrudListRequest<T>,
  actions: UseFetchActions,
  sort?: ICrudListRequestSort,
  filter?: ICrudListRequestFilter,
) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const pageParams = actions.pageInfo;
    const data = await request(pageParams, sort || null, filter || null);
    return data;
  };

  useEffect(() => {
    fetchList().then(res => {
      // TODO 这里也可以获取到其他分页数据
      setList(res.rows);
    });
  }, []);

  return {
    dataSource: list,
  };
};

export default useFetchData;
