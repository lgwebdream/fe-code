import { useState, useEffect } from 'react';
import '../../service';
import '../TableTypes';
import usePrevious from '../hooks/usePrevious';
const mergeOptionAndPageInfo = ({ pageInfo }) => {
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
const useFetchData = (getData, defaultData, actions) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageInfo, setPageInfo] = useState(mergeOptionAndPageInfo({ pageInfo: actions.pageInfo }));
    const { effects = [], onRequestError } = actions || {};
    // 缓存上一次的pageInfo 用于分页改变时查询列表
    const prePage = usePrevious(pageInfo?.current);
    const prePageSize = usePrevious(pageInfo?.pageSize);
    const fetchList = async () => {
        const { current, pageSize } = pageInfo;
        const pageParams = actions?.pageInfo !== false ? { current, pageSize } : undefined;
        setLoading(true);
        try {
            await getData(pageParams).then(response => {
                const { data, code } = response;
                if (code !== 200)
                    setList([]);
                const responseData = data?.data;
                setLoading(false);
                setList(responseData);
            });
        }
        catch (error) {
            /** 上报错误信息 */
            if (onRequestError === undefined) {
                throw new Error(error);
            }
            onRequestError(error);
        }
        finally {
            setLoading(false);
        }
    };
    // 分页发生变化的时候自动刷新
    useEffect(() => {
        const { current, pageSize } = actions.pageInfo || {};
        if ((!prePage || prePage === current) &&
            (!prePageSize || prePageSize === pageSize)) {
            // eslint-disable-next-line no-useless-return
            return;
        }
        setPageInfo({ current, pageSize, total: list.length });
    }, [actions.pageInfo]);
    useEffect(() => {
        fetchList();
    }, [...effects, pageInfo]);
    return {
        dataSource: list,
        pageInfo,
        loading,
        setPageInfo: async (info) => {
            setPageInfo({
                ...pageInfo,
                ...info,
            });
        },
    };
};
export default useFetchData;
