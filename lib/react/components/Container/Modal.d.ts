import { ModalProps } from 'antd';
import { ICrudColumn } from '../Crud.d';

export interface ICrudModalProps extends ModalProps {
  /** 表单 */
  data?: Record<string, any>;
  /** 表单字段列表 */
  columns?: ICrudColumn[];
}
