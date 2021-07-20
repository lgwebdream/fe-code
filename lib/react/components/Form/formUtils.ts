import { IFormComTypeEnum } from "./constant";
import Mapping from "./mappting";

export function findComByName(name: IFormComTypeEnum) : React.FunctionComponent<any> | React.ComponentClass {
    if (Mapping[name]) {
        return Mapping[name]
    } else {
        console.error(`未注册${name}组件`)
        return null
    }
}