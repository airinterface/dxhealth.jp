# SMART® Health Cards とは

FHIRの規定の実装例は前回上げましたが、それをどの方法を使用して、
データを取得したり、送信したりするのか、Web上ではにはRESTをつかいAPIで対応できますが、
最近はQRCode、ファイルなどを携帯のWalletに入れてワクチン接種の証明,
保険証の証明を行ったりすることもでてきます。

そのメインのデータ形式をSMART Health Cardsといいます。(この後、SHCと略称します。)
1. 健康保険機関、医療機関から、SMART® Health Cardといいます。
をQRコードまたは、ファイルで、発行してもらいます。
2. SMARTHealthCardを取り込めるアプリ、アンドロイドなどら、
[CommonHealth　App](https://play.google.com/store/apps/details?id=org.thecommonsproject.android.phr)
iPhoneなら、[アップルヘルス](https://www.apple.com/ios/health/)を使用し、スキャンし、自分のデータはWalletで
管理できます。
3. Walletから、QRコードを見せて、それを医療機関がスキャンすると、情報をスキャンした側に渡すことができます。 
4. SHCの中には、健康保険証、医療機関を証明するための情報がヘッダーに、FHIRのフォーマットを使用した医療データがボディに
搭載されています。これを、本人が持つことにより、情報の送信、受信をコントロールすることができます。


実装例は、[こちら](https://www.commonhealth.org/smart-health-cards)に記入してあります。


