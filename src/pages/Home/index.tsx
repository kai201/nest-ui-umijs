import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { GridContent } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';

const HomeView: React.FC = () => {
  const { name } = useModel('global');
  return (
    <GridContent>
      <div className={styles.container}>
        <Guide name={trim(name)} />
      </div>
    </GridContent>
  );
};

export default HomeView;
