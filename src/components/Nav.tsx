import React, { useState } from 'react';
import NavIcon from './NavIcon';
import Menu from './Menu';
import styles from '@/styles/Nav.module.scss';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navIconStyles = {
    width: "50px",
    height: "50px",
    cursor: "pointer",
    padding: "10px"
  }
  return (
    <div className={styles.nav}>
      <NavIcon open={menuOpen} setOpen={setMenuOpen} styles={navIconStyles} />
      <Menu open={menuOpen} setOpen={setMenuOpen} />
    </div>
  );
};

export default Nav;
