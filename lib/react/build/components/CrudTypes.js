import 'react';
import 'antd';
import 'antd/es/form/index.d';
import 'antd/lib/table/interface';
import './Form/constant';
import './Form/FormTypes';
import './service';
/** 操作容器定义 */
export var ICurdContainerTypeEnum;
(function (ICurdContainerTypeEnum) {
    /** modal 弹框模式 */
    ICurdContainerTypeEnum["Modal"] = "modal";
    /** panel 窗体模式 */
    ICurdContainerTypeEnum["Panel"] = "panel";
})(ICurdContainerTypeEnum || (ICurdContainerTypeEnum = {}));
/** 内置功能类型 */
export var ICrudToolbarTypeEnum;
(function (ICrudToolbarTypeEnum) {
    /** 添加 */
    ICrudToolbarTypeEnum["Add"] = "add";
    /** 编辑 */
    ICrudToolbarTypeEnum["Edit"] = "edit";
    /** 删除 */
    ICrudToolbarTypeEnum["Delete"] = "delete";
    /** 批量删除 */
    ICrudToolbarTypeEnum["DeleteBatch"] = "deleteBatch";
})(ICrudToolbarTypeEnum || (ICrudToolbarTypeEnum = {}));
