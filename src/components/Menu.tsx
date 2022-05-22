import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import lottie from 'lottie-web/build/player/lottie_light';
import animationData from '../animations/burger.json';
import Link from 'next/link'


type MenuTypes = {
  open: boolean,
  setOpen: Function
};

export default function Menu({ open, setOpen }:MenuTypes) {


  return (
    <div
    >
      <ul>
        <li>
          <Link href="/blog">
          DxHealth
          </Link>
        </li>
        <li>About</li>
      </ul>
    </div>
  );
}


Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};