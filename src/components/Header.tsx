import styles from '@/styles/Header.module.scss';
import { withRouter, NextRouter } from 'next/router';

interface WithRouterProps {
  router: NextRouter;
}

type HeaderComponentProps = WithRouterProps;

function Header({ router }: HeaderComponentProps) {
  const isHome = router.pathname === `/` || router.pathname === `/index`;
  const menuClass = isHome ? styles.big_menu : styles.small_menu;

  return (
    <div className={menuClass} onClick={() => router.push(`/`)}>
      <h1 key="1" className={styles.title}>
        DxHealth
      </h1>
      <p key="2" className={styles.description}>
        動く　グローバル　医療 個人データ
      </p>
    </div>
  );
}

export default withRouter(Header);
