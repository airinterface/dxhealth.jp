import styles from '@/styles/Header.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const scrollY = 50;

import { withRouter, NextRouter } from 'next/router';

interface WithRouterProps {
  router: NextRouter;
}

type HeaderComponentProps = WithRouterProps;

function Header({ router }: HeaderComponentProps) {
  const [menuClass, setMenuClass] = useState(styles.small_menu);
  const getMenuClass = (scrollY = 0) => {
    console.info(`Router = ` + router.pathname);
    const isHome = router.pathname === `/` ?? router.pathname === `/index`;
    return isHome ? styles.big_menu : styles.small_menu;
  };
  useEffect(() => {
    setMenuClass(getMenuClass(0));
  }, [router]);

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
