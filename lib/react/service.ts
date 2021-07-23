export interface FetcherResult<T> {
  data?: {
    data: T[] | undefined;
  };
  code: number;
  msg: string;
  msgTimeout?: number;
  errors?: {
    [propName: string]: string;
  };
  [propName: string]: any; // 为了兼容其他返回格式
}

export interface FetchOptions {
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  successMessage?: string;
  errorMessage?: string;
  autoAppend?: boolean;
  beforeSend?: (data: any) => any;
  onSuccess?: (json: Payload) => any;
  onFailed?: (json: Payload) => any;
  silent?: boolean;
  [propName: string]: any;
}

export interface Payload {
  ok: boolean;
  msg: string;
  msgTimeout?: number;
  data: any;
  status: number;
  errors?: {
    [propName: string]: string;
  };
}
