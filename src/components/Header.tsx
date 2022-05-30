import styles from '@/styles/Header.module.scss'
export default function Header() {
  return(
    <div className={styles.header_container}>
      <h1 key="1" className={styles.title}>
        DxHealth
      </h1>
      <p key="2" className={styles.description}>
        動く　グローバル　医療 個人データ       
      </p>
    </div>
  )
}