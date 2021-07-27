import './constant';
import Mapping from './mappting';
export function findComByName(name) {
    if (Mapping[name]) {
        return Mapping[name];
    }
    console.error(`未注册${name}组件`);
    return null;
}
