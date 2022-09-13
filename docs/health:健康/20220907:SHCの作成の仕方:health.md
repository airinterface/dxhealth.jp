# SMART® Health Cards の生成方法

SMART® Health Cards(SHC) は　OpenSourceのスタンダードで、誰でもも生成できます。
しかし、この生成元のサインインキーがどこでホストされ、
その証明用のパブリックのSignitureは発行は公式に[VCIの機構](https://vci.org/issuers)に確認され、OpenSourceとして[Github](https://github.com/the-commons-project/vci-directory)に
発表されます。これにより、のグローバルな信用性、中立性を確率しています。


発行者は毎年、新しいサインインキーを生成し、パブリックキVCI-Directoryに登録した発行者がホストする、サーバーの＜ISSと同じ生成者側がホストするサーバー>/.well-known/jwks.json
に追加するのが推奨されます。つまり、プライベートキーは発行者のみが所持するため、そこで安全性を確保しています。



