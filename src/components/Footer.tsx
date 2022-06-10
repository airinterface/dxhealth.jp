import Image from 'next/image';
import styles from '@/styles/Footer.module.scss';

export default function Footer() {

      return (
        <footer className={styles.footer}>
          Powered by <a href="https://github.com/airinterface/dxhealth.jp" target="_new" >
          airinterface
          </a>
       </footer>)
    }