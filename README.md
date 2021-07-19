# 🤖 前端代码 no-code 🌈

很多前端同学，每日不仅要忙于内卷，还要忙于奔波在重复的业务逻辑期间，所以我们索性开发了这样一款工具，帮助大家可以直接根据接口生成 CURD 的全部代码，让大家生活多些快乐，功能 todolist：

> - 根据接口生成 ts 的接口声明文档
> - 根据接口直接生成 Vue+TS(js 代码)
> - 根据接口直接生成 React+TS(js 代码)
> - 定制选择指定 UI 组件库，直接根据接口生成
> - 将 JavaScript 代码直接生成 TypeScript 代码

<img src="./assets/logo.png" alt="logo" style="zoom:20%;" />

---



## 目录

- [配置项](#配置项)
- [基础命令](#基础命令)
  - [`api2code`](#`api2code`)



## 配置项

### 配置文件

配置文件在项目根目录下，支持以下格式。如果没有配置文件所有值将会走默认配置。

-  `.fecoderc`
- `.fecoderc.json`
- `.fecoderc.yaml`
- `.fecoderc.yml`
- `.fecoderc.js`
- `.fecoderc.cjs`
- `fe-code.config.js`
- `fe-code.config.cjs`



### 配置项

| 配置项          | 类型      | 描述                                | 默认                    |
| --------------- | --------- | ----------------------------------- | ----------------------- |
| `url`           | `string`  | 使用该脚手架发送请求时的默认baseUrl | `http://localhost:3000` |
| `root`          | `string`  | 输出文件时的根路径                  | `src`                   |
| `framework`     | `array`   | 使用的框架 `Vue`, `React`           | `[]`                    |
| `useTypescript` | `boolean` | 项目中是否使用TS                    | `true`                  |
| `language`      | `string`  | （预留）脚手架使用的自然语言        | `zh-CN`                 |



```json
{
  "url": "http://localhost:3000",
  "root": "src",
  "framework": [],
  "useTypescript": true,
  "language": "zh-CN"
}
```



## 基础命令

```shell
#查看版本号
fe-code -V
#查看帮助文档
fe-code --help
#接口生成TS代码帮助文档
fe-code api2code --help
```

<img src="./assets/hello.png" alt="logo" style="zoom:38%;" />



### `api2code`

缩写：`a2c`

#### 参数

```bash
Options:
  -u, --url <url>        （可选）api地址(域名 或 ip) (默认: "http://localhost:3000")
  -p, --path <path>      （可选）api路径
  -b, --body <body>      （可选）post方法中baby的json路径, only post method.
  -i, --input <input>    （可选）输入的json路径
  -o, --output <output>  （必填）输出interface的文件路径
  -h, --help              查看帮助
```



#### 例子🌰

1. 通过请求接口的方式生成interface

   ```bash
   fe-code a2c -o src/index.ts -p /getDetails
   ```

2. 通过本地json方式生成interface

   ```bash
   fe-code a2c -o src/index.ts -i /data.json
   ```

