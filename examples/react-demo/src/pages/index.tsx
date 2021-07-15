import FCrud from '@fe-code/react/Crud';
import styles from './index.less';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>CRUD</h1>

      <FCrud />
    </div>
  );
}
