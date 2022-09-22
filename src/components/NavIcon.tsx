import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import lottie from 'lottie-web/build/player/lottie_light';
import animationData from '../animations/burger.json';

type NavIconProps = {
  open: boolean;
  setOpen: any;
  styles?: CSSProperties;
};
let anim: any = null;

export default function NavIcon({ open, setOpen, styles }: NavIconProps) {
  const animationContainer = useRef(null);

  useEffect(() => {
    if (animationContainer.current) {
      anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: `svg`,
        loop: false,
        autoplay: false,
        animationData,
      });

      return () => {
        console.info(`destroy`);
        anim?.destroy();
      };
    }
  }, []);

  return (
    <div
      style={styles}
      onClick={() => {
        console.info(`clicked: ` + open + `:` + (anim != null));
        setOpen(!open);
        anim?.setDirection(open ? -1 : 1);
        anim?.play();
      }}
      ref={animationContainer}
    ></div>
  );
}

NavIcon.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
