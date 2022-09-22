import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import lottie from 'lottie-web/build/player/lottie_light';
import animationData from '../animations/burger.json';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getBlogCategory } from '@/pages/api/BlogService';

type MenuTypes = {
  open: boolean;
  setOpen: any;
};

export default function Menu({ open, setOpen }: MenuTypes) {
  const router = useRouter();
  const categories = getBlogCategory();
  const classes = `menuContainer ${open ? `opened` : ``}`;

  const clickMenu = (path: any) => {
    router.push(path);
  };
  return (
    <div className={classes}>
      <style jsx>
        {`
          .menuContainer {
            transition: opacity 1s linear;
            opacity: 0;
            overflow-x: hidden;
            overflow-y: auto;
            width: inherit;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: 8px;
            scrollbar-color: transparent transparent;
          }

          .opened {
            opacity: 1;
          }

          ul {
            list-style-type: none;
            margin-block-start: 0;
            margin-block-end: 0;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            padding-inline-start: 0px;
          }

          li {
            pointer-events: all;
            list-style-type: none;
            cursor: pointer;
            transition: background-color 0.75s linear, transform 0.5s linear,
              padding 0.5s linear;
            transform-origin: left;
            transform: rotateY(-90deg);
            padding: 0.5em 2em;
            font-size: 1.2em;
            font-family: 'GenJyuuGothicMonoMedium', 'Times New Roman', Times;
          }

          li:nth-child(1) {
            transform: rotateY(-80deg);
          }
          li:nth-child(2) {
            transform: rotateY(-85deg);
          }
          li:nth-child(3) {
            transform: rotateY(-90deg);
          }

          .opened li {
            transform: rotateY(0deg);
          }

          .opened li:hover {
            background-color: var(--menuBg);
            transform: translateX(5px);
          }
        `}
      </style>
      <ul>
        <li key="0" onClick={() => clickMenu(`/`)}>
          Home
        </li>
        <li key="1" onClick={() => clickMenu(`/About`)}>
          About
        </li>
      </ul>
    </div>
  );
}

Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
