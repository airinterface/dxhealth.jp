import React, { useState, useEffect } from 'react';
import NavIcon from './NavIcon';
import Menu from './Menu';
import styles from '@/styles/Nav.module.scss';
import { useRouter } from 'next/router'


const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter()
  const handleRouteChange = ( url:string ) => {
    console.info("router change ====== " + url )
    setMenuOpen( false )
  }

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange)
  }, []);

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
