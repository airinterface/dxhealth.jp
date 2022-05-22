import React, { useState } from 'react';
import NavIcon from './NavIcon';
import Menu from './Menu';
import styles from '@/styles/Nav.module.scss';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={styles.nav}>
      <NavIcon open={menuOpen} setOpen={setMenuOpen} />
      <Menu open={menuOpen} setOpen={setMenuOpen} />
    </div>
  );
};

export default Nav;
