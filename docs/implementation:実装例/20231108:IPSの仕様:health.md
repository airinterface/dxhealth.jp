# IPSの仕様

IPS(International Patient Summary)とは多数の医療機関の
データをまとめ出し、カテゴリーごとに表示できるようにできる機能の仕様です。
どこの国でもどこの医療機関でも同じ仕様で表示されるため、
外診、救急、初診の際にIPSが取り入れられるとトリアージ、引き継ぎの際コミュニケーション、
医療情報の連絡などの際の重要な情報の伝達ツールとして国際的に利用できます。
IPS基準の作成には　CEN, HL7, IHE, ISO, and SNOMEDなどの医療基準設定各機関
やGlobal Digital Health Partnership (GDHP), the G7, the G20 and World Health Organization (WHO)が参加しています。

詳しくは、こちら[https://international-patient-summary.net/](https://international-patient-summary.net/)を参考にしてください。


## 実装例

[The Commons Project](https://www.commonhealth.org/network)では１３００以上のネットワークから
IPSを一括に作成できるツールを開発し　またそのIPSを閲覧できるツールも[オープンソース](https://github.com/the-commons-project/shc-web-reader)で公開し、（下記参照）色々な場面で個人の意思により
情報を公開できるようになっています。



## IPS の構成

IPSはケアの引き継ぎ、移行の際、全てではなく、必要最小限の情報で構成されています。


構成のTemplateは(CDA R2)[https://www.hl7.org/implement/standards/product_brief.cfm?product_id=447]を使用しています。
その中で、(FHIRのComposition)[http://build.fhir.org/ig/HL7/fhir-ips/] (現在のバージョン) の構成
に従い、情報が入っています。

その中には　Header, 必要項目、推奨項目、任意項目

### Header
Subject：連絡タイトル
Author：作成者
Attester：元の医療情報の承認者
Custodian：元の医療情報の管理者

### 

