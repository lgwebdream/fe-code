import { useEffect, useRef } from 'react';
const usePrevious = (state) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = state;
    });
    return ref.current;
};
export default usePrevious;
