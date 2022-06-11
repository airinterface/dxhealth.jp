import styles from '@/styles/About.module.scss'
export default function About() {

  return (
    <>
    <div className={styles.container} >
      <h1>DxHealth - 個人の医療データを考える</h1>
      <p>ネットでの情報交換がどんどん簡単になっていく中、個人の医療情報はまだ
      なかなか、同じフォーマットでは持てず、また医療機関から他の医療機関への
      情報への渡し方はどうしても個人が機関に申請するか、最悪、書類作成を必要としてしまいがちです。
      さらに、これが海外対応だと更に難しさは増えます。
      </p>
      <p>このブロジェクトは現在のグローバルな人の行き来の増える中、どのようにして、
      個人の大切な医療情報を個人でコントロールしつつ、必要な情報を必要な機関に
      公開できるか、または管理できるかを考えたり、実装例を公開していきます。
      </p>
      <p>このブロジェクト自体は<a href="https://github.com/airinterface/dxhealth.jp.git" target="_new">
      Github</a>にてコンテツとも公開しています。貢献していただけると大歓迎です。貢献の方法はこちらに記述します。
      </p>
      <p>Blog自体もそのRepositoryにパッケージされています。コンテンツ多くなった場合は保存場所を考えます。</p>
      <p>貢献者：
        <ul>
        <li><em>福田ゆり</em><br />
        DxHealth製作者。
        現在、テクノロジストエンジニアとして、個人のプロジェクトを企画、作成していく傍ら、現在は非営利機関
        <a href="https://www.thecommonsproject.org/" target="_new">TheCommonsProject</a>
        でリードエンジニアとして、働いています。

        </li>
        </ul>
      </p>
    </div>
    </>
  )
}

