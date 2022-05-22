import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import styles from '@/styles/Nav.module.scss';
import lottie from 'lottie-web/build/player/lottie_light';
import animationData from '../animations/burger.json';


type NavIconProps = {
  open: boolean,
  setOpen: Function
};
var anim:any = null;

export default function NavIcon({ open, setOpen }:NavIconProps) {
  const animationContainer = useRef(null);

  useEffect(() => {
    if (animationContainer.current) {
      anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData,
      });

      return () => {
        console.info("destroy")
        anim?.destroy();
      }
    }
  }, []);

  return (
    <div
      onClick={() => {
        console.info("clicked: " + open + ":" + ( anim != null ))
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