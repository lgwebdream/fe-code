type Properties<T> = Record<string, T> | Record<string, T>[] | T;

interface ResponseParams {
  required: boolean; // 是否必传
  type: 'number' | 'string' | 'boolean' | 'array' | 'object' | 'enum'; // 数据类型
  description?: string; // 字段描述
  example?: unknown; // 示例数据
  properties?: Properties<ResponseParams>; // 当type为引用类型时有该值
}

interface RequestParams extends ResponseParams {
  in: 'path' | 'query' | 'body'; // 该参数的所属位置 path为动态路由上的参数
  properties?: Properties<RequestParams>; // 当type为引用类型时有该值
}

// 每个接口中间类型格式
interface Api {
  method: 'GET' | 'POST' | 'DELETE';
  domain?: string; // 接口部署的域名, 例如"http://z100.com"
  path: string; //  请求路径，例如 "/order/v1/submit",
  description: string; // 功能描述，用于生成注释，例如"提交新的订单",
  requestParams: Record<string, RequestParams>; // key对应的是字段名称  GET和POST共用，处理时区别对待，用于反解析请求参数的类型定义
  response: Record<string, ResponseParams>; // key对应的是字段名称 响应数据
}

// 接口信息对象
export interface ApiConfig {
  apis: Record<string, Api[]>; // string会用于生成服务类的名称
  version: string; // api版本
}
