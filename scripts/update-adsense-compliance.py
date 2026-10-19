# -*- coding: utf-8 -*-
"""Apply AdSense compliance copy to all locale message files (phase 1 + 2 content)."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MESSAGES = ROOT / "src" / "messages"

LOCALES = ["en", "ja", "zh", "zh-TW", "es", "fr", "de", "ko", "it", "pt", "ru"]

PRIVACY = {
    "en": {
        "title": "Privacy Policy",
        "description": "How Duskbloods Guide collects, uses, and shares data — including Google Analytics and advertising cookies.",
        "paragraphs": [
            "This Privacy Policy explains how Duskbloods Guide (\u201cwe\u201d, \u201cus\u201d) collects, uses, and shares information when you visit https://duskbloods.net (the \u201cSite\u201d). This is an unofficial fan information site about the game The Duskbloods.",
            "We do not require an account and do not intentionally collect personal information such as your name, address, or payment details to read our content. Standard technical data may be processed automatically as described below.",
            "Analytics. We use Google Analytics to understand aggregate traffic and improve the Site. Google Analytics may set cookies and similar technologies (such as identifiers) and may process your IP address, device and browser information, pages viewed, referral URL, and approximate location derived from IP. Google uses this data on our behalf to produce usage reports. Learn how Google uses data at https://policies.google.com/technologies/partner-sites and review Google\u2019s Privacy Policy at https://policies.google.com/privacy.",
            "Advertising cookies and web beacons. If we display ads, third-party vendors — including Google — may use cookies, web beacons, or similar identifiers to serve and measure ads, to limit how often you see an ad, and, where enabled, to personalize ads based on your visits to this and other sites. Google\u2019s use of advertising cookies enables it and its partners to serve ads based on your visit to our Site and/or other sites on the Internet.",
            "Other cookies. We may use a cookie to remember your language preference. Disabling cookies in your browser settings does not block access to our content.",
            "Your choices. You can manage or opt out of personalized advertising in Google Ads Settings (https://adssettings.google.com/). You can opt out of Google Analytics advertising features via Google Analytics Opt-out Browser Add-on (https://tools.google.com/dlpage/gaoptout), or of some third-party cookies via www.aboutads.info/choices. You can also block or delete cookies in your browser. Where the EU/UK GDPR or ePrivacy rules apply, we will request consent before setting non-essential cookies or using identifiers for personalized ads.",
            "Children. The Site is intended for a general audience and is not directed at children under 13 (or the applicable age in your country). We do not knowingly collect personal information from children.",
            "Data retention and security. Analytics and server logs are retained only as long as needed for reporting, security, and abuse prevention. We use reasonable safeguards, but no method of transmission over the Internet is completely secure.",
            "Your rights. Depending on your location, you may have rights to access, correct, delete, or restrict certain processing of your data, and to object to or withdraw consent where processing is based on consent. To make a request, contact us using the contact channels on the Site.",
            "Changes. We may update this Privacy Policy from time to time. The latest version will always be published on this page with an updated date.",
            "This Site is an unofficial fan resource and is not affiliated with or endorsed by FromSoftware or Nintendo. The Duskbloods and related marks belong to their respective owners.",
            "Contact. For privacy questions, use the contact page on the Site (contact@duskbloods.net).",
        ],
    },
    "zh": {
        "title": "隐私政策",
        "description": "Duskbloods Guide 如何收集、使用与共享数据——包括 Google Analytics 与广告 Cookie。",
        "paragraphs": [
            "本隐私政策说明 Duskbloods Guide（\u201c我们\u201d）在您访问 https://duskbloods.net（\u201c本站\u201d）时如何收集、使用与共享信息。本站是关于游戏《The Duskbloods》的非官方粉丝资讯站。",
            "阅读内容无需注册账号，我们也不会刻意收集姓名、地址或支付信息等个人身份信息。下列场景中可能自动处理必要的技术数据。",
            "分析。我们使用 Google Analytics 了解汇总流量并改进本站。Google Analytics 可能使用 Cookie 及类似技术（如标识符），并可能处理 IP 地址、设备与浏览器信息、浏览页面、来源网址，以及由 IP 推断的大致位置。Google 代表我们处理这些数据以生成使用报告。了解 Google 如何使用数据：https://policies.google.com/technologies/partner-sites；Google 隐私政策：https://policies.google.com/privacy。",
            "广告 Cookie 与网络信标。若我们展示广告，包括 Google 在内的第三方供应商可能使用 Cookie、网络信标或类似标识符来投放与衡量广告、限制广告展示频次；在启用个性化时，还可能根据您访问本站及其他网站的情况进行个性化广告投放。Google 使用广告 Cookie 后，可使其与合作伙伴根据您访问本站和/或互联网其他网站的情况向您展示广告。",
            "其他 Cookie。我们可能使用 Cookie 记住您的语言偏好。您可在浏览器中禁用 Cookie，不影响正文阅读。",
            "您的选择。您可在 Google 广告设置（https://adssettings.google.com/）管理或退出个性化广告；可通过 Google Analytics 浏览器插件（https://tools.google.com/dlpage/gaoptout）退出 Google Analytics 广告功能；也可通过 www.aboutads.info/choices 管理部分第三方 Cookie，或在浏览器中屏蔽/删除 Cookie。若适用欧盟/英国 GDPR 或电子隐私规则，我们会在设置非必要 Cookie 或将标识符用于个性化广告前征求同意。",
            "儿童。本站面向一般受众，不针对 13 岁以下（或您所在国家/地区的适用年龄）儿童。我们不会故意收集儿童个人信息。",
            "保留与安全。分析数据与服务器日志仅在报告、安全与防滥用所需期限内保留。我们采取合理安全措施，但互联网传输无法保证绝对安全。",
            "您的权利。视您所在地区而定，您可能享有访问、更正、删除或限制特定数据处理的权利，以及在基于同意的处理中撤回同意或提出异议的权利。如需行使，请通过本站联系页面与我们联系。",
            "变更。我们可能不时更新本隐私政策，最新版本将始终发布在本页并更新日期。",
            "本站是非官方粉丝资源，与 FromSoftware、Nintendo 无隶属关系，亦未获其背书。The Duskbloods 及相关商标归各自权利人所有。",
            "联系。隐私相关问题请通过本站联系页面联系（contact@duskbloods.net）。",
        ],
    },
    "zh-TW": {
        "title": "隱私權政策",
        "description": "Duskbloods Guide 如何收集、使用與共享資料——包括 Google Analytics 與廣告 Cookie。",
        "paragraphs": [
            "本隱私權政策說明 Duskbloods Guide（\u201c我們\u201d）在您造訪 https://duskbloods.net（\u201c本站\u201d）時如何收集、使用與共享資訊。本站是關於遊戲《The Duskbloods》的非官方粉絲資訊站。",
            "閱讀內容無需註冊帳號，我們也不會刻意收集姓名、地址或付款資訊等個人資料。下列情境中可能自動處理必要的技術資料。",
            "分析。我們使用 Google Analytics 了解彙總流量並改進本站。Google Analytics 可能使用 Cookie 及類似技術（如識別碼），並可能處理 IP 位址、裝置與瀏覽器資訊、瀏覽頁面、來源網址，以及由 IP 推斷的大致位置。Google 代表我們處理這些資料以產生使用報告。了解 Google 如何使用資料：https://policies.google.com/technologies/partner-sites；Google 隱私權政策：https://policies.google.com/privacy。",
            "廣告 Cookie 與網路信標。若我們展示廣告，包括 Google 在內的第三方供應商可能使用 Cookie、網路信標或類似識別碼來投放與衡量廣告、限制廣告展示次數；在啟用個人化時，還可能根據您造訪本站及其他網站的情況進行個人化廣告。Google 使用廣告 Cookie 後，可使其與合作夥伴根據您造訪本站和/或網際網路其他網站的情況向您展示廣告。",
            "其他 Cookie。我們可能使用 Cookie 記住您的語言偏好。您可在瀏覽器中停用 Cookie，不影響正文閱讀。",
            "您的選擇。您可在 Google 廣告設定（https://adssettings.google.com/）管理或退出個人化廣告；可透過 Google Analytics 瀏覽器外掛（https://tools.google.com/dlpage/gaoptout）退出 Google Analytics 廣告功能；也可透過 www.aboutads.info/choices 管理部分第三方 Cookie，或在瀏覽器中封鎖/刪除 Cookie。若適用歐盟/英國 GDPR 或電子隱私規則，我們會在設定非必要 Cookie 或將識別碼用於個人化廣告前徵求同意。",
            "兒童。本站面向一般受眾，不針對 13 歲以下（或您所在國家/地區的適用年齡）兒童。我們不會故意收集兒童個人資料。",
            "保留與安全。分析資料與伺服器日誌僅在報告、安全與防濫用所需期限內保留。我們採取合理安全措施，但網際網路傳輸無法保證絕對安全。",
            "您的權利。視您所在地區而定，您可能享有存取、更正、刪除或限制特定資料處理的權利，以及在基於同意的處理中撤回同意或提出異議的權利。如需行使，請透過本站聯絡頁面與我們聯絡。",
            "變更。我們可能不時更新本隱私權政策，最新版本將始終發布在本頁並更新日期。",
            "本站是非官方粉絲資源，與 FromSoftware、Nintendo 無隸屬關係，亦未獲其背書。The Duskbloods 及相關商標歸各自權利人所有。",
            "聯絡。隱私權相關問題請透過本站聯絡頁面聯絡（contact@duskbloods.net）。",
        ],
    },
}

# Remaining locales filled below in a second map to keep this file readable.
PRIVACY_MORE = {
    "ja": {
        "title": "プライバシーポリシー",
        "description": "Duskbloods Guide におけるデータの収集・利用・共有（Google Analytics および広告 Cookie を含む）について。",
        "paragraphs": [
            "本プライバシーポリシーは、Duskbloods Guide（以下「当サイト」）が https://duskbloods.net（以下「本サイト」）へのアクセス時に情報をどのように収集・利用・共有するかを説明します。本サイトはゲーム『The Duskbloods』に関する非公式ファン情報サイトです。",
            "コンテンツの閲覧にアカウントは不要で、氏名・住所・決済情報などの個人情報を意図的に収集することはありません。以下に記載する通り、技術的データが自動的に処理される場合があります。",
            "アクセス解析。当サイトでは集計トラフィックの把握と改善のため Google Analytics を使用しています。Google Analytics は Cookie や類似技術（識別子など）を設定し、IP アドレス、端末・ブラウザ情報、閲覧ページ、参照元 URL、IP から推定される概算の位置情報を処理する場合があります。Google は当サイトに代わってこれらのデータを処理しレポートを作成します。Google によるデータの利用：https://policies.google.com/technologies/partner-sites ／ Google プライバシーポリシー：https://policies.google.com/privacy。",
            "広告 Cookie とウェブビーコン。広告を掲示する場合、Google を含む第三者ベンダーが Cookie、ウェブビーコン、または類似の識別子を使用し、広告の配信・効果測定・表示頻度の制限、および（有効な場合）本サイトや他サイトへのアクセスに基づくパーソナライズ広告を行うことがあります。Google が広告 Cookie を使用すると、Google およびそのパートナーは、本サイトおよび/またはインターネット上の他のサイトへのアクセスに基づいて広告を表示できるようになります。",
            "その他の Cookie。言語設定の保存のために Cookie を使用する場合があります。ブラウザ設定で Cookie を無効化してもコンテンツ閲覧に影響しません。",
            "お客様の選択。Google 広告設定（https://adssettings.google.com/）でパーソナライズ広告を管理またはオプトアウトできます。Google Analytics の広告機能はオプトアウトアドオン（https://tools.google.com/dlpage/gaoptout）で、一部の第三者 Cookie は www.aboutads.info/choices で管理できます。ブラウザでの Cookie のブロック・削除も可能です。EU/英国の GDPR や電子プライバシー規則が適用される場合、必須でない Cookie の設定や識別子を用いたパーソナライズ広告の前に同意を取得します。",
            "子ども向けではありません。本サイトは一般向けであり、13 歳未満（またはお住まいの国・地域の適用年齢）の子どもを対象としていません。子どもの個人情報を故意に収集することはありません。",
            "保持とセキュリティ。解析データとサーバーログは、レポート・セキュリティ・不正防止に必要な期間のみ保持します。合理的な安全対策を講じますが、インターネット経由の送信が完全に安全である保証はありません。",
            "お客様の権利。地域により、データへのアクセス・訂正・削除・処理制限の権利、同意に基づく処理への異議申立て・同意撤回の権利がある場合があります。ご請求は本サイトの連絡先からお問い合わせください。",
            "変更。本ポリシーは予告なく更新されることがあります。最新版は常に本ページに掲載します。",
            "本サイトは非公式ファンリソースであり、FromSoftware、Nintendo とは無関係で、承認も受けていません。The Duskbloods および関連マークは各権利者に帰属します。",
            "お問い合わせ。プライバシーに関するご質問は本サイトの連絡先（contact@duskbloods.net）まで。",
        ],
    },
    "es": {
        "title": "Política de privacidad",
        "description": "Cómo Duskbloods Guide recopila, usa y comparte datos, incluidos Google Analytics y cookies publicitarias.",
        "paragraphs": [
            "Esta Política de privacidad explica cómo Duskbloods Guide (\u201cwe\u201d, \u201cnosotros\u201d) recopila, usa y comparte información cuando visitas https://duskbloods.net (el \u201cSitio\u201d). Este es un sitio informativo de fans no oficial sobre el juego The Duskbloods.",
            "No exigimos una cuenta y no recopilamos deliberadamente información personal como nombre, dirección o datos de pago para leer el contenido. Pueden procesarse datos técnicos estándar como se describe a continuación.",
            "Analítica. Usamos Google Analytics para entender el tráfico agregado y mejorar el Sitio. Google Analytics puede usar cookies y tecnologías similares (identificadores) y puede tratar su dirección IP, información de dispositivo y navegador, páginas vistas, URL de referencia y ubicación aproximada derivada de la IP. Google usa estos datos en nuestro nombre para generar informes. Cómo usa Google los datos: https://policies.google.com/technologies/partner-sites. Política de Privacidad de Google: https://policies.google.com/privacy.",
            "Cookies publicitarias y balizas web. Si mostramos anuncios, proveedores externos, incluido Google, pueden usar cookies, balizas web o identificadores similares para servir y medir anuncios, limitar la frecuencia y, si está activado, personalizar anuncios según sus visitas a este u otros sitios. El uso que hace Google de las cookies publicitarias permite que él y sus partners muestren anuncios basados en su visita a nuestro Sitio y/o a otros sitios de Internet.",
            "Otras cookies. Podemos usar una cookie para recordar su preferencia de idioma. Desactivar cookies en el navegador no impide acceder al contenido.",
            "Sus opciones. Puede gestionar o excluir la publicidad personalizada en Configuración de anuncios de Google (https://adssettings.google.com/). Puede excluir funciones publicitarias de Google Analytics con el complemento de exclusión (https://tools.google.com/dlpage/gaoptout) o gestionar algunas cookies de terceros en www.aboutads.info/choices. También puede bloquear o eliminar cookies en su navegador. Cuando apliquen el RGPD de la UE/Reino Unido o las normas de privacidad electrónica, solicitaremos consentimiento antes de cookies no esenciales o identificadores para anuncios personalizados.",
            "Niños. El Sitio es para un público general y no se dirige a menores de 13 años (o la edad aplicable en su país). No recopilamos deliberadamente información personal de niños.",
            "Conservación y seguridad. Los datos de analítica y registros del servidor se conservan solo el tiempo necesario para informes, seguridad y prevención de abusos. Usamos salvaguardas razonables, pero ningún método de transmisión por Internet es completamente seguro.",
            "Sus derechos. Según su ubicación, puede tener derechos de acceso, corrección, eliminación o restricción de cierto tratamiento, y de oposición o retirada del consentimiento cuando el tratamiento se base en consentimiento. Para ejercerlos, contáctenos en los canales del Sitio.",
            "Cambios. Podemos actualizar esta política; la versión más reciente se publicará en esta página con fecha actualizada.",
            "Este Sitio es un recurso de fans no oficial y no está afiliado ni respaldado por FromSoftware o Nintendo. The Duskbloods y las marcas relacionadas pertenecen a sus respectivos titulares.",
            "Contacto. Para preguntas de privacidad, use la página de contacto del Sitio (contact@duskbloods.net).",
        ],
    },
    "fr": {
        "title": "Politique de confidentialité",
        "description": "Comment Duskbloods Guide collecte, utilise et partage les données — y compris Google Analytics et les cookies publicitaires.",
        "paragraphs": [
            "Cette politique de confidentialité explique comment Duskbloods Guide (« nous ») collecte, utilise et partage des informations lorsque vous visitez https://duskbloods.net (le « Site »). Il s\u2019agit d\u2019un site de fans non officiel consacré au jeu The Duskbloods.",
            "Aucun compte n\u2019est requis et nous ne collectons pas volontairement d\u2019informations personnelles (nom, adresse, paiement) pour lire le contenu. Des données techniques peuvent être traitées automatiquement comme décrit ci-dessous.",
            "Analytique. Nous utilisons Google Analytics pour comprendre le trafic agrégé et améliorer le Site. Google Analytics peut déposer des cookies et technologies similaires (identifiants) et traiter votre adresse IP, les informations d\u2019appareil et de navigateur, les pages consultées, l\u2019URL de provenance et une localisation approximative dérivée de l\u2019IP. Google utilise ces données pour notre compte afin de produire des rapports. Utilisation des données par Google : https://policies.google.com/technologies/partner-sites. Politique de confidentialité de Google : https://policies.google.com/privacy.",
            "Cookies publicitaires et balises Web. Si nous diffusons des publicités, des tiers — y compris Google — peuvent utiliser cookies, balises Web ou identifiants similaires pour servir et mesurer les annonces, limiter leur fréquence et, si activé, personnaliser les annonces selon vos visites sur ce site et d\u2019autres. L\u2019utilisation par Google de cookies publicitaires lui permet, à lui et à ses partenaires, de diffuser des annonces basées sur votre visite de notre Site et/ou d\u2019autres sites Internet.",
            "Autres cookies. Un cookie peut mémoriser votre préférence de langue. Désactiver les cookies dans le navigateur n\u2019empêche pas l\u2019accès au contenu.",
            "Vos choix. Vous pouvez gérer ou refuser la publicité personnalisée dans les paramètres Google Ads (https://adssettings.google.com/). Vous pouvez refuser les fonctions publicitaires de Google Analytics via le module de désactivation (https://tools.google.com/dlpage/gaoptout), ou gérer certains cookies tiers sur www.aboutads.info/choices. Vous pouvez aussi bloquer ou supprimer les cookies dans votre navigateur. Lorsque le RGPD UE/Royaume-Uni ou les règles de confidentialité électronique s\u2019appliquent, nous demanderons un consentement avant les cookies non essentiels ou les identifiants pour la publicité personnalisée.",
            "Enfants. Le Site s\u2019adresse au grand public et ne vise pas les enfants de moins de 13 ans (ou l\u2019âge applicable dans votre pays). Nous ne collectons pas sciemment d\u2019informations personnelles d\u2019enfants.",
            "Conservation et sécurité. Les données d\u2019analyse et les journaux serveur ne sont conservés que le temps nécessaire aux rapports, à la sécurité et à la prévention des abus. Nous mettons en œuvre des garanties raisonnables, mais aucune transmission Internet n\u2019est totalement sûre.",
            "Vos droits. Selon votre localisation, vous pouvez disposer de droits d\u2019accès, de rectification, d\u2019effacement ou de limitation, et d\u2019opposition ou de retrait du consentement lorsque le traitement est fondé sur celui-ci. Pour une demande, contactez-nous via les canaux du Site.",
            "Modifications. Nous pouvons mettre à jour cette politique ; la version en vigueur sera publiée sur cette page avec une date actualisée.",
            "Ce Site est une ressource de fans non officielle, non affiliée à FromSoftware ou Nintendo et non approuvée par eux. The Duskbloods et les marques associées appartiennent à leurs titulaires respectifs.",
            "Contact. Pour toute question relative à la confidentialité, utilisez la page de contact du Site (contact@duskbloods.net).",
        ],
    },
    "de": {
        "title": "Datenschutzerklärung",
        "description": "Wie Duskbloods Guide Daten erhebt, nutzt und teilt — einschließlich Google Analytics und Werbe-Cookies.",
        "paragraphs": [
            "Diese Datenschutzerklärung erläutert, wie Duskbloods Guide (\u201cwe\u201d, \u201cuns\u201d) Informationen erhebt, nutzt und teilt, wenn Sie https://duskbloods.net (die \u201cWebsite\u201d) besuchen. Dies ist eine inoffizielle Fan-Informationsseite zum Spiel The Duskbloods.",
            "Ein Konto ist nicht erforderlich; personenbezogene Daten wie Name, Adresse oder Zahlungsdaten werden zum Lesen der Inhalte nicht bewusst erhoben. Technische Daten können wie nachstehend beschrieben automatisch verarbeitet werden.",
            "Analyse. Wir nutzen Google Analytics, um aggregierte Zugriffe zu verstehen und die Website zu verbessern. Google Analytics kann Cookies und ähnliche Technologien (Kennungen) setzen und IP-Adresse, Geräte- und Browserinformationen, besuchte Seiten, Referrer-URL sowie einen aus der IP abgeleiteten ungefähren Standort verarbeiten. Google verarbeitet diese Daten in unserem Auftrag für Berichte. Datennutzung durch Google: https://policies.google.com/technologies/partner-sites. Google-Datenschutzrichtlinie: https://policies.google.com/privacy.",
            "Werbe-Cookies und Web-Beacons. Wenn wir Werbung anzeigen, können Drittanbieter — einschließlich Google — Cookies, Web-Beacons oder ähnliche Kennungen nutzen, um Anzeigen auszuliefern und zu messen, die Häufigkeit zu begrenzen und, sofern aktiviert, Anzeigen basierend auf Ihren Besuchen auf dieser und anderen Websites zu personalisieren. Durch die Nutzung von Werbe-Cookies durch Google können Google und seine Partner Anzeigen auf Basis Ihres Besuchs auf unserer Website und/oder anderen Websites im Internet ausspielen.",
            "Weitere Cookies. Ein Cookie kann Ihre Spracheinstellung speichern. Das Deaktivieren von Cookies im Browser verhindert den Zugriff auf Inhalte nicht.",
            "Ihre Auswahl. Personalisierte Werbung können Sie in den Google-Anzeigen-Einstellungen (https://adssettings.google.com/) verwalten oder ablehnen. Google-Analytics-Werbefunktionen lassen sich über das Opt-out-Add-on (https://tools.google.com/dlpage/gaoptout) ablehnen; einige Drittanbieter-Cookies über www.aboutads.info/choices. Sie können Cookies im Browser auch blockieren oder löschen. Gelten DSGVO (EU/UK) oder ePrivacy, holen wir vor nicht essenziellen Cookies oder Kennungen für personalisierte Werbung eine Einwilligung ein.",
            "Kinder. Die Website richtet sich an ein allgemeines Publikum und nicht an Kinder unter 13 Jahren (oder dem geltenden Alter in Ihrem Land). Wir erheben wissentlich keine personenbezogenen Daten von Kindern.",
            "Speicherung und Sicherheit. Analyse- und Serverprotokolle werden nur so lange aufbewahrt, wie es für Berichte, Sicherheit und Missbrauchsprävention erforderlich ist. Wir setzen angemessene Schutzmaßnahmen ein; eine Internetübertragung ist jedoch nie vollständig sicher.",
            "Ihre Rechte. Je nach Standort haben Sie ggf. Rechte auf Auskunft, Berichtigung, Löschung oder Einschränkung sowie Widerspruch oder Widerruf einer Einwilligung. Nutzen Sie hierfür die Kontaktkanäle der Website.",
            "Änderungen. Wir können diese Erklärung aktualisieren; die jeweils aktuelle Fassung erscheint auf dieser Seite mit Stand.",
            "Diese Website ist eine inoffizielle Fan-Ressource und weder mit FromSoftware noch Nintendo verbunden noch von diesen unterstützt. The Duskbloods und verwandte Marken liegen bei den jeweiligen Inhabern.",
            "Kontakt. Datenschutzfragen über die Kontaktseite der Website (contact@duskbloods.net).",
        ],
    },
    "ko": {
        "title": "개인정보 처리방침",
        "description": "Duskbloods Guide가 데이터를 수집·이용·공유하는 방식 — Google Analytics 및 광고 쿠키 포함.",
        "paragraphs": [
            "본 처리방침은 Duskbloods Guide(이하 \u201c당사\u201d)가 https://duskbloods.net(\u201c사이트\u201d) 방문 시 정보를 어떻게 수집·이용·공유하는지 설명합니다. 본 사이트는 The Duskbloods 게임 관련 비공식 팬 정보 사이트입니다.",
            "콘텐츠 열람에 계정은 필요하지 않으며, 이름·주소·결제 정보 등 개인 정보를 의도적으로 수집하지 않습니다. 아래 내용에 따라 기술적 데이터가 자동 처리될 수 있습니다.",
            "분석. 당사는 집계 트래픽 파악과 사이트 개선을 위해 Google Analytics를 사용합니다. Google Analytics는 쿠키 및 유사 기술(식별자)을 사용할 수 있으며 IP 주소, 기기·브라우저 정보, 방문 페이지, 참조 URL, IP 기반 대략적 위치를 처리할 수 있습니다. Google은 당사를 대신해 이 데이터를 처리해 보고서를 만듭니다. Google의 데이터 이용: https://policies.google.com/technologies/partner-sites. Google 개인정보 처리방침: https://policies.google.com/privacy.",
            "광고 쿠키 및 웹 비콘. 광고를 표시하는 경우 Google을 포함한 제3자 제공업체가 쿠키, 웹 비콘 또는 유사 식별자를 사용해 광고를 게재·측정하고 노출 빈도를 제한하며, 활성화된 경우 이 사이트 및 다른 사이트 방문 기반 맞춤 광고를 할 수 있습니다. Google의 광고 쿠키 사용으로 Google과 파트너는 귀하의 당사 사이트 및/또는 인터넷상 다른 사이트 방문을 기반으로 광고를 게재할 수 있습니다.",
            "기타 쿠키. 언어 설정 기억에 쿠키를 사용할 수 있습니다. 브라우저에서 쿠키를 비활성화해도 콘텐츠 열람은 가능합니다.",
            "귀하의 선택. Google 광고 설정(https://adssettings.google.com/)에서 맞춤 광고를 관리하거나 옵트아웃할 수 있습니다. Google Analytics 광고 기능은 옵트아웃 애드온(https://tools.google.com/dlpage/gaoptout)으로, 일부 제3자 쿠키는 www.aboutads.info/choices에서 관리할 수 있습니다. 브라우저에서 쿠키 차단·삭제도 가능합니다. EU/영국 GDPR 또는 전자 개인정보 규칙이 적용되는 경우 필수 쿠키가 아니거나 맞춤 광고용 식별자 사용 전에 동의를 받습니다.",
            "아동. 본 사이트는 일반 대상이며 만 13세 미만(또는 거주 국가의 적용 연령) 아동을 대상으로 하지 않습니다. 아동의 개인 정보를 고의로 수집하지 않습니다.",
            "보관 및 보안. 분석 데이터와 서버 로그는 보고·보안·악용 방지에 필요한 기간만 보관합니다. 합리적 안전조치를 시행하나 인터넷 전송이 완전히 안전할 수는 없습니다.",
            "귀하의 권리. 거주 지역에 따라 접근·정정·삭제·처리 제한 요청 권리와, 동의 기반 처리에 대한 이의 제기·동의 철회 권리가 있을 수 있습니다. 요청은 사이트 연락처를 이용해 주세요.",
            "변경. 본 방침은 수시로 업데이트될 수 있으며 최신 버전이 이 페이지에 게시됩니다.",
            "본 사이트는 비공식 팬 리소스이며 FromSoftware, Nintendo와 제휴·보증 관계가 없습니다. The Duskbloods 및 관련 상표는 각 권리자에게 있습니다.",
            "문의. 개인정보 관련 문의는 사이트 연락처(contact@duskbloods.net)로 해 주세요.",
        ],
    },
    "it": {
        "title": "Informativa sulla privacy",
        "description": "Come Duskbloods Guide raccoglie, utilizza e condivide i dati — inclusi Google Analytics e cookie pubblicitari.",
        "paragraphs": [
            "Questa informativa spiega come Duskbloods Guide (\u201cnoi\u201d) raccoglie, utilizza e condivide informazioni quando visiti https://duskbloods.net (il \u201cSito\u201d). È un sito di fan non ufficiale sul gioco The Duskbloods.",
            "Non è richiesto un account e non raccogliamo intenzionalmente dati personali come nome, indirizzo o pagamenti per leggere i contenuti. Dati tecnici possono essere trattati automaticamente come descritto di seguito.",
            "Analitica. Usiamo Google Analytics per capire il traffico aggregato e migliorare il Sito. Google Analytics può impostare cookie e tecnologie simili (identificatori) e trattare indirizzo IP, informazioni su dispositivo e browser, pagine viste, URL di provenienza e posizione approssimativa derivata dall\u2019IP. Google elabora questi dati per nostro conto per report. Uso dei dati da parte di Google: https://policies.google.com/technologies/partner-sites. Informativa Privacy di Google: https://policies.google.com/privacy.",
            "Cookie pubblicitari e web beacon. Se mostriamo annunci, terze parti — incluso Google — possono usare cookie, web beacon o identificatori simili per servire e misurare annunci, limitarne la frequenza e, se attivo, personalizzarli in base alle visite a questo e altri siti. L\u2019uso dei cookie pubblicitari da parte di Google consente a Google e ai suoi partner di mostrare annunci basati sulla tua visita al nostro Sito e/o ad altri siti Internet.",
            "Altri cookie. Possiamo usare un cookie per ricordare la lingua. Disabilitare i cookie nel browser non blocca l\u2019accesso ai contenuti.",
            "Le tue scelte. Puoi gestire o disattivare la pubblicità personalizzata nelle Impostazioni annunci di Google (https://adssettings.google.com/). Puoi disattivare le funzioni pubblicitarie di Google Analytics con l\u2019add-on di opt-out (https://tools.google.com/dlpage/gaoptout) o gestire alcuni cookie terzi su www.aboutads.info/choices. Puoi anche bloccare o eliminare i cookie nel browser. Quando si applicano GDPR UE/UK o regole ePrivacy, chiederemo il consenso prima di cookie non essenziali o identificatori per annunci personalizzati.",
            "Bambini. Il Sito è per un pubblico generale e non è rivolto a bambini sotto i 13 anni (o l\u2019età applicabile nel tuo Paese). Non raccogliamo consapevolmente dati personali di bambini.",
            "Conservazione e sicurezza. Dati di analisi e log del server sono conservati solo per il tempo necessario a report, sicurezza e prevenzione abusi. Adottiamo garanzie ragionevoli, ma nessuna trasmissione Internet è completamente sicura.",
            "I tuoi diritti. A seconda della località, potresti avere diritti di accesso, rettifica, cancellazione o limitazione e di opposizione o revoca del consenso quando il trattamento si basa sul consenso. Per richieste, contattaci tramite i canali del Sito.",
            "Modifiche. Possiamo aggiornare questa informativa; la versione più recente sarà pubblicata su questa pagina con data aggiornata.",
            "Questo Sito è una risorsa di fan non ufficiale, non affiliata a FromSoftware o Nintendo e non da loro approvata. The Duskbloods e i marchi correlati appartengono ai rispettivi titolari.",
            "Contatti. Per domande sulla privacy usa la pagina contatti del Sito (contact@duskbloods.net).",
        ],
    },
    "pt": {
        "title": "Política de Privacidade",
        "description": "Como o Duskbloods Guide recolhe, usa e partilha dados — incluindo Google Analytics e cookies de publicidade.",
        "paragraphs": [
            "Esta Política de Privacidade explica como o Duskbloods Guide (\u201cnós\u201d) recolhe, usa e partilha informações quando visita https://duskbloods.net (o \u201cSite\u201d). Trata-se de um site de fãs não oficial sobre o jogo The Duskbloods.",
            "Não exigimos conta e não recolhemos deliberadamente informações pessoais como nome, morada ou dados de pagamento para ler o conteúdo. Dados técnicos podem ser processados automaticamente conforme descrito abaixo.",
            "Análise. Usamos Google Analytics para compreender tráfego agregado e melhorar o Site. O Google Analytics pode definir cookies e tecnologias semelhantes (identificadores) e tratar o seu endereço IP, informações de dispositivo e navegador, páginas vistas, URL de referência e localização aproximada derivada do IP. O Google usa estes dados em nosso nome para produzir relatórios. Como o Google usa dados: https://policies.google.com/technologies/partner-sites. Política de Privacidade do Google: https://policies.google.com/privacy.",
            "Cookies de publicidade e web beacons. Se exibirmos anúncios, terceiros — incluindo o Google — podem usar cookies, web beacons ou identificadores semelhantes para servir e medir anúncios, limitar a frequência e, quando ativo, personalizar anúncios com base nas suas visitas a este e a outros sites. O uso de cookies de publicidade pelo Google permite que ele e os seus parceiros exibam anúncios com base na sua visita ao nosso Site e/ou a outros sites na Internet.",
            "Outros cookies. Podemos usar um cookie para memorizar o seu idioma. Desativar cookies no navegador não impede o acesso ao conteúdo.",
            "As suas escolhas. Pode gerir ou recusar publicidade personalizada nas Definições de anúncios do Google (https://adssettings.google.com/). Pode recusar funções de publicidade do Google Analytics com o add-on de opt-out (https://tools.google.com/dlpage/gaoptout) ou gerir alguns cookies de terceiros em www.aboutads.info/choices. Também pode bloquear ou eliminar cookies no navegador. Quando se aplicam o RGPD da UE/Reino Unido ou regras de privacidade eletrónica, pediremos consentimento antes de cookies não essenciais ou identificadores para anúncios personalizados.",
            "Crianças. O Site destina-se ao público em geral e não a crianças com menos de 13 anos (ou a idade aplicável no seu país). Não recolhemos conscientemente informações pessoais de crianças.",
            "Retenção e segurança. Dados de análise e registos do servidor são mantidos apenas pelo tempo necessário para relatórios, segurança e prevenção de abusos. Usamos salvaguardas razoáveis, mas nenhum método de transmissão pela Internet é totalmente seguro.",
            "Os seus direitos. Conforme a sua localização, pode ter direitos de acesso, correção, eliminação ou restrição de certos tratamentos e de oposição ou retirada de consentimento quando o tratamento se baseia no consentimento. Para pedidos, contacte-nos pelos canais do Site.",
            "Alterações. Podemos atualizar esta política; a versão mais recente será publicada nesta página com data atualizada.",
            "Este Site é um recurso de fãs não oficial, não afiliado a FromSoftware ou Nintendo nem por estes endossado. The Duskbloods e marcas relacionadas pertencem aos respectivos titulares.",
            "Contacto. Para questões de privacidade, use a página de contacto do Site (contact@duskbloods.net).",
        ],
    },
    "ru": {
        "title": "Политика конфиденциальности",
        "description": "Как Duskbloods Guide собирает, использует и передаёт данные — включая Google Analytics и рекламные cookie.",
        "paragraphs": [
            "Настоящая Политика конфиденциальности объясняет, как Duskbloods Guide («мы») собирает, использует и передаёт информацию при посещении https://duskbloods.net («Сайт»). Это неофициальный фан-сайт об игре The Duskbloods.",
            "Учётная запись не требуется; мы сознательно не собираем персональные данные (имя, адрес, платёжные данные) для чтения контента. Технические данные могут обрабатываться автоматически, как описано ниже.",
            "Аналитика. Мы используем Google Analytics для понимания агрегированного трафика и улучшения Сайта. Google Analytics может использовать cookie и аналогичные технологии (идентификаторы) и обрабатывать IP-адрес, сведения об устройстве и браузере, просмотренные страницы, URL источника и приблизительное местоположение по IP. Google обрабатывает эти данные от нашего имени для отчётов. Как Google использует данные: https://policies.google.com/technologies/partner-sites. Политика конфиденциальности Google: https://policies.google.com/privacy.",
            "Рекламные cookie и веб-маяки. Если мы размещаем рекламу, сторонние поставщики, включая Google, могут использовать cookie, веб-маяки или аналогичные идентификаторы для показа и измерения объявлений, ограничения частоты показа и, если включено, персонализации рекламы на основе посещения этого и других сайтов. Использование Google рекламных cookie позволяет ему и его партнёрам показывать объявления на основе вашего посещения нашего Сайта и/или других сайтов в Интернете.",
            "Другие cookie. Мы можем использовать cookie для запоминания языка. Отключение cookie в браузере не блокирует доступ к контенту.",
            "Ваш выбор. Вы можете управлять персонализированной рекламой или отказаться от неё в Настройках рекламы Google (https://adssettings.google.com/). Отказ от рекламных функций Google Analytics — через дополнение (https://tools.google.com/dlpage/gaoptout); часть сторонних cookie — на www.aboutads.info/choices. Также можно блокировать или удалять cookie в браузере. Если применяются GDPR ЕС/Великобритании или правила электронной приватности, мы запросим согласие до необязательных cookie или идентификаторов для персонализированной рекламы.",
            "Дети. Сайт предназначен для широкой аудитории и не ориентирован на детей младше 13 лет (или применимого возраста в вашей стране). Мы сознательно не собираем персональные данные детей.",
            "Хранение и безопасность. Аналитические данные и серверные журналы хранятся только столько, сколько необходимо для отчётов, безопасности и предотвращения злоупотреблений. Мы применяем разумные меры, но передача через Интернет не может быть полностью безопасной.",
            "Ваши права. В зависимости от региона у вас могут быть права на доступ, исправление, удаление или ограничение обработки, а также на возражение или отзыв согласия, если обработка основана на согласии. Для запроса свяжитесь с нами через контакты на Сайте.",
            "Изменения. Мы можем обновлять эту Политику; актуальная версия публикуется на этой странице с датой.",
            "Сайт — неофициальный фан-ресурс, не связан с FromSoftware или Nintendo и не одобрен ими. The Duskbloods и связанные обозначения принадлежат соответствующим правообладателям.",
            "Контакты. По вопросам конфиденциальности используйте страницу контактов (contact@duskbloods.net).",
        ],
    },
}

TERMS = {
    "en": [
        "By accessing this site you agree to these terms. Duskbloods Guide provides free, unofficial information about the game The Duskbloods for informational and educational purposes.",
        "The Duskbloods, all related names, marks, and assets are trademarks of their respective owners, including FromSoftware and Nintendo. This site claims no affiliation with, sponsorship from, or endorsement by those parties.",
        "Content on this site is written independently and may be updated or corrected at any time. We make no warranties about the completeness or accuracy of information, which may change as the game develops. Official details should always be confirmed on Nintendo and FromSoftware channels.",
        "Use of this site is also subject to our Privacy Policy, which explains how we handle data, cookies, analytics, and advertising technologies. Please review that page before using the site.",
        "If you have concerns about content, copyright, or these terms, please reach out through the site's contact channels (contact@duskbloods.net).",
    ],
    "zh": [
        "访问本站即表示您同意本条款。Duskbloods Guide 提供关于游戏《The Duskbloods》的免费非官方信息，仅供信息与教育用途。",
        "The Duskbloods 及所有相关名称、商标与素材归各自权利人所有，包括 FromSoftware 与 Nintendo。本站不主张与上述方存在隶属、赞助或背书关系。",
        "站内内容为独立撰写，可能随时更新或更正。我们不对信息的完整性或准确性作保证，内容可能随游戏开发而变化。官方细节请以 Nintendo 与 FromSoftware 渠道为准。",
        "使用本站亦受《隐私政策》约束，其中说明我们如何处理数据、Cookie、分析与广告技术。使用前请查阅该页。",
        "如对内容、版权或本条款有疑问，请通过站内联系渠道联系（contact@duskbloods.net）。",
    ],
    "zh-TW": [
        "造訪本服務即表示您同意本條款。Duskbloods Guide 提供關於遊戲《The Duskbloods》的免費非官方資訊，僅供資訊與教育用途。",
        "The Duskbloods 及所有相關名稱、商標與素材歸各自權利人所有，包括 FromSoftware 與 Nintendo。本服務不主張與上述方存在隸屬、贊助或背書關係。",
        "站內內容為獨立撰寫，可能隨時更新或更正。我們不對資訊的完整性或準確性作保證，內容可能隨遊戲開發而變化。官方細節請以 Nintendo 與 FromSoftware 渠道為準。",
        "使用網路服務亦受《隱私權政策》約束，其中說明我們如何處理資料、Cookie、分析與廣告技術。使用前請查閱該頁。",
        "如對內容、版權或本條款有疑問，請透過站內聯絡管道聯絡（contact@duskbloods.net）。",
    ],
    "ja": [
        "本サイトへのアクセスは、本規約への同意を意味します。Duskbloods Guide はゲーム『The Duskbloods』に関する無料の非公式情報を、情報提供・教育目的で提供します。",
        "The Duskbloods および関連する名称・商標・素材は、FromSoftware、Nintendo を含む各権利者に帰属します。当サイトはこれらとの提携、後援、承認を主張しません。",
        "コンテンツは独立して作成され、予告なく更新・修正されることがあります。情報の完全性・正確性は保証しません。公式情報は必ず Nintendo および FromSoftware の公式チャネルでご確認ください。",
        "本サイトの利用にはプライバシーポリシーも適用されます。データ、Cookie、解析、広告技術の取扱いについて同ページをご確認ください。",
        "コンテンツ、著作権、本規約に関するご連絡は、本サイトの連絡先（contact@duskbloods.net）までお願いします。",
    ],
    "es": [
        "Al acceder a este sitio acepta estos términos. Duskbloods Guide ofrece información gratuita y no oficial sobre el juego The Duskbloods con fines informativos y educativos.",
        "The Duskbloods, todos los nombres, marcas y activos relacionados son marcas de sus respectivos titulares, incluidos FromSoftware y Nintendo. Este sitio no afilia patrocinio ni respaldo de esas partes.",
        "El contenido se escribe de forma independiente y puede actualizarse o corregirse en cualquier momento. No garantizamos exactitud o integridad; confirme siempre en los canales oficiales de Nintendo y FromSoftware.",
        "El uso del sitio también está sujeto a nuestra Política de privacidad, que explica datos, cookies, analítica y tecnologías publicitarias. Revísela antes de usar el sitio.",
        "Para dudas sobre contenido, derechos de autor o estos términos, contáctenos en los canales del sitio (contact@duskbloods.net).",
    ],
    "fr": [
        "En accédant à ce site, vous acceptez ces conditions. Duskbloods Guide fournit gratuitement des informations non officielles sur le jeu The Duskbloods à des fins informatives et éducatives.",
        "The Duskbloods, tous les noms, marques et actifs associés sont des marques de leurs titulaires respectifs, dont FromSoftware et Nintendo. Ce site ne revendique aucune affiliation, sponsorship ou approbation de leur part.",
        "Le contenu est rédigé indépendamment et peut être mis à jour ou corrigé à tout moment. Nous ne garantissons pas l\u2019exactitude ; confirmez toujours auprès des canaux officiels Nintendo et FromSoftware.",
        "L\u2019utilisation du site est également soumise à notre Politique de confidentialité, qui explique données, cookies, analytique et technologies publicitaires. Veuillez la consulter avant d\u2019utiliser le site.",
        "Pour toute question sur le contenu, le droit d\u2019auteur ou ces conditions, contactez-nous via les canaux du site (contact@duskbloods.net).",
    ],
    "de": [
        "Mit dem Zugriff auf diese Website stimmen Sie diesen Bedingungen zu. Duskbloods Guide stellt kostenlose, inoffizielle Informationen zum Spiel The Duskbloods zu Informations- und Bildungszwecken bereit.",
        "The Duskbloods sowie alle zugehörigen Namen, Marken und Inhalte sind Marken ihrer jeweiligen Inhaber, darunter FromSoftware und Nintendo. Diese Website beansprucht keine Zugehörigkeit, kein Sponsoring und keine Billigung durch diese Parteien.",
        "Inhalte werden unabhängig verfasst und können jederzeit aktualisiert oder korrigiert werden. Für Richtigkeit wird keine Gewähr übernommen. Bestätigen Sie Angaben stets über die offiziellen Kanäle von Nintendo und FromSoftware.",
        "Die Nutzung der Website unterliegt auch unserer Datenschutzerklärung zu Daten, Cookies, Analyse und Werbetechnologien. Bitte lesen Sie diese Seite vor der Nutzung.",
        "Bei Fragen zu Inhalten, Urheberrecht oder diesen Bedingungen nutzen Sie die Kontaktkanäle der Website (contact@duskbloods.net).",
    ],
    "ko": [
        "본 사이트에 접근하면 본 약관에 동의하는 것으로 봅니다. Duskbloods Guide는 The Duskbloods 게임에 대한 무료 비공식 정보를 정보·교육 목적으로 제공합니다.",
        "The Duskbloods 및 관련 명칭, 상표, 자산은 FromSoftware, Nintendo 등 각 권리자의 상표입니다. 본 사이트는 해당 주체와의 제휴, 후원, 보증을 주장하지 않습니다.",
        "콘텐츠는 독립적으로 작성되며 언제든 수정·업데이트될 수 있습니다. 정확성은 보장하지 않으며, 공식 정보는 Nintendo·FromSoftware 채널에서 확인하세요.",
        "사이트 이용에는 개인정보 처리방침도 적용됩니다(데이터, 쿠키, 분석, 광고 기술). 이용 전 해당 페이지를 확인해 주세요.",
        "콘텐츠, 저작권, 약관 관련 문의는 사이트 연락처(contact@duskbloods.net)로 해 주세요.",
    ],
    "it": [
        "Accedendo a questo sito accetti queste condizioni. Duskbloods Guide fornisce informazioni gratuite e non ufficiali sul gioco The Duskbloods a scopo informativo ed educativo.",
        "The Duskbloods, tutti i nomi, marchi e asset correlati sono marchi dei rispettivi proprietari, inclusi FromSoftware e Nintendo. Questo sito non rivendica affiliazione, sponsorizzazione o approvazione.",
        "I contenuti sono scritti in modo indipendente e possono essere aggiornati o corretti in qualsiasi momento. Confermate sempre i dettagli sui canali ufficiali Nintendo e FromSoftware.",
        "L\u2019uso del sito è soggetto anche alla nostra Informativa sulla privacy, che spiega dati, cookie, analisi e tecnologie pubblicitarie. Consultala prima dell\u2019uso.",
        "Per dubbi su contenuti, copyright o queste condizioni, contattaci tramite i canali del sito (contact@duskbloods.net).",
    ],
    "pt": [
        "Ao aceder a este site, concorda com estes termos. O Duskbloods Guide fornece informação gratuita e não oficial sobre o jogo The Duskbloods para fins informativos e educativos.",
        "The Duskbloods, todos os nomes, marcas e activos relacionados são marcas dos respectivos titulares, incluindo FromSoftware e Nintendo. Este site não reivindica afiliação, patrocínio ou endosso dessas partes.",
        "O conteúdo é escrito de forma independente e pode ser atualizado ou corrigido a qualquer momento. Confirme sempre nos canais oficiais da Nintendo e FromSoftware.",
        "A utilização do site está também sujeita à nossa Política de Privacidade, que explica dados, cookies, análise e tecnologias publicitárias. Reveja-a antes de usar o site.",
        "Para dúvidas sobre conteúdo, direitos de autor ou estes termos, contacte-nos pelos canais do site (contact@duskbloods.net).",
    ],
    "ru": [
        "Используя сайт, вы принимаете настоящие условия. Duskbloods Guide предоставляет бесплатную неофициальную информацию об игре The Duskbloods в информационных и образовательных целях.",
        "The Duskbloods, все связанные названия, марки и материалы являются товарными знаками соответствующих правообладателей, включая FromSoftware и Nintendo. Сайт не заявляет о принадлежности, спонсорстве или одобрении с их стороны.",
        "Контент создаётся независимо и может обновляться или исправляться в любое время. Точность не гарантируется; подтверждайте данные на официальных каналах Nintendo и FromSoftware.",
        "Использование сайта также регулируется Политикой конфиденциальности (данные, cookie, аналитика, рекламные технологии). Ознакомьтесь с ней перед использованием.",
        "По вопросам контента, авторских прав или условий свяжитесь с нами через контакты сайта (contact@duskbloods.net).",
    ],
}

CONTACT_EMAIL = {
    "en": "contact@duskbloods.net",
    "ja": "contact@duskbloods.net",
    "zh": "contact@duskbloods.net",
    "zh-TW": "contact@duskbloods.net",
    "es": "contact@duskbloods.net",
    "fr": "contact@duskbloods.net",
    "de": "contact@duskbloods.net",
    "ko": "contact@duskbloods.net",
    "it": "contact@duskbloods.net",
    "pt": "contact@duskbloods.net",
    "ru": "contact@duskbloods.net",
}

# about.site — "About this site" block
ABOUT_SITE = {
    "en": {
        "title": "About this site",
        "lead": "Duskbloods Guide is an independent fan information hub. We are not FromSoftware or Nintendo.",
        "items": [
            {
                "title": "Who runs this site",
                "desc": "Duskbloods Guide is run by an independent editorial team as a fan project. We are not affiliated with, sponsored by, or endorsed by FromSoftware, Nintendo, or Kadokawa.",
            },
            {
                "title": "What we publish",
                "desc": "News explainers, system guides, character breakdowns, release-date tracking, and network-test notes — written for players who want clear, sourced answers.",
            },
            {
                "title": "Sources & independence",
                "desc": "Facts come from official Nintendo/FromSoftware materials and public reporting. Analysis and rankings are our own. Official screenshots are credited to their owners; our commentary is independent.",
            },
            {
                "title": "Corrections & updates",
                "desc": "We correct errors when found and update pages as the game develops. Spot something wrong? Use the contact page — we read every message.",
            },
        ],
    },
    "zh": {
        "title": "关于本站",
        "lead": "Duskbloods Guide 是独立的粉丝资讯站，并非 FromSoftware 或 Nintendo。",
        "items": [
            {
                "title": "谁在运营",
                "desc": "Duskbloods Guide 由独立编辑团队以粉丝项目形式运营，与 FromSoftware、Nintendo、Kadokawa 无隶属、赞助或背书关系。",
            },
            {
                "title": "我们发布什么",
                "desc": "新闻解读、系统指南、角色解析、发售日追踪与网络测试记录——面向需要清晰、可溯源答案的玩家。",
            },
            {
                "title": "来源与独立性",
                "desc": "事实来自 Nintendo/FromSoftware 官方资料与公开报道；分析与排名为本站独立观点。官方截图已标注归属，评论为独立撰写。",
            },
            {
                "title": "更正与更新",
                "desc": "发现错误会及时更正，并随游戏开发更新页面。有问题请通过联系页告诉我们，我们都会阅读。",
            },
        ],
    },
    "zh-TW": {
        "title": "關於本站",
        "lead": "Duskbloods Guide 是獨立的粉絲資訊站，並非 FromSoftware 或 Nintendo。",
        "items": [
            {
                "title": "誰在營運",
                "desc": "Duskbloods Guide 由獨立編輯團隊以粉絲專案形式營運，與 FromSoftware、Nintendo、Kadokawa 無隸屬、贊助或背書關係。",
            },
            {
                "title": "我們發布什麼",
                "desc": "新聞解讀、系統指南、角色解析、發售日追蹤與網路測試紀錄——面向需要清晰、可溯源答案的玩家。",
            },
            {
                "title": "來源與獨立性",
                "desc": "事實來自 Nintendo/FromSoftware 官方資料與公開報導；分析與排名為本站獨立觀點。官方截圖已標註歸屬，評論為獨立撰寫。",
            },
            {
                "title": "更正與更新",
                "desc": "發現錯誤會及時更正，並隨遊戲開發更新頁面。有問題請透過聯絡頁告訴我們，我們都會閱讀。",
            },
        ],
    },
    "ja": {
        "title": "このサイトについて",
        "lead": "Duskbloods Guide は独立したファン情報ハブです。FromSoftware または Nintendo ではありません。",
        "items": [
            {
                "title": "運営者",
                "desc": "Duskbloods Guide は独立した編集チームによるファンプロジェクトです。FromSoftware、Nintendo、Kadokawa とは無関係で、後援・承認も受けていません。",
            },
            {
                "title": "掲載内容",
                "desc": "ニュース解説、システムガイド、キャラクター解説、発売日トラッキング、ネットワークテスト記録など、根拠のある分かりやすい情報を届けます。",
            },
            {
                "title": "出典と独立性",
                "desc": "事実は Nintendo/FromSoftware の公式情報と公開報道に基づきます。分析やランキングは当サイトの見解です。公式スクリーンショットは権利者を明記し、コメントは独立して作成しています。",
            },
            {
                "title": "訂正と更新",
                "desc": "誤りは見つけ次第訂正し、ゲームの進展に合わせて更新します。お気づきの点は連絡先までご連絡ください。",
            },
        ],
    },
    "es": {
        "title": "Sobre este sitio",
        "lead": "Duskbloods Guide es un hub informativo de fans independiente. No somos FromSoftware ni Nintendo.",
        "items": [
            {
                "title": "Quién gestiona el sitio",
                "desc": "Duskbloods Guide lo gestiona un equipo editorial independiente como proyecto de fans. No estamos afiliados a FromSoftware, Nintendo ni Kadokawa, ni patrocinados o respaldados por ellos.",
            },
            {
                "title": "Qué publicamos",
                "desc": "Noticias explicativas, guías de sistemas, análisis de personajes, seguimiento de la fecha de lanzamiento y notas del network test — para jugadores que buscan respuestas claras y con fuentes.",
            },
            {
                "title": "Fuentes e independencia",
                "desc": "Los hechos provienen de materiales oficiales de Nintendo/FromSoftware y reportajes públicos. El análisis y los rankings son propios. Las capturas oficiales se acreditan a sus dueños; el comentario es independiente.",
            },
            {
                "title": "Correcciones y actualizaciones",
                "desc": "Corregimos errores y actualizamos páginas a medida que avanza el juego. ¿Algo mal? Use la página de contacto: leemos cada mensaje.",
            },
        ],
    },
    "fr": {
        "title": "À propos de ce site",
        "lead": "Duskbloods Guide est un hub d\u2019information de fans indépendant. Nous ne sommes ni FromSoftware ni Nintendo.",
        "items": [
            {
                "title": "Qui exploite ce site",
                "desc": "Duskbloods Guide est géré par une équipe éditoriale indépendante en tant que projet de fans. Nous ne sommes pas affiliés à FromSoftware, Nintendo ou Kadokawa, ni parrainés ou approuvés par eux.",
            },
            {
                "title": "Ce que nous publions",
                "desc": "Analyses d\u2019actualités, guides systèmes, fiches personnages, suivi de la date de sortie et notes du network test — pour des réponses claires et sourcées.",
            },
            {
                "title": "Sources et indépendance",
                "desc": "Les faits proviennent des supports officiels Nintendo/FromSoftware et de la presse publique. Analyses et classements sont les nôtres. Les captures officielles sont créditées à leurs propriétaires ; nos commentaires sont indépendants.",
            },
            {
                "title": "Corrections et mises à jour",
                "desc": "Nous corrigeons les erreurs et mettons à jour les pages au fil du jeu. Une erreur ? Utilisez la page contact — nous lisons chaque message.",
            },
        ],
    },
    "de": {
        "title": "Über diese Website",
        "lead": "Duskbloods Guide ist ein unabhängiges Fan-Informationsportal. Wir sind weder FromSoftware noch Nintendo.",
        "items": [
            {
                "title": "Wer betreibt die Website",
                "desc": "Duskbloods Guide wird von einem unabhängigen Redaktionsteam als Fan-Projekt betrieben. Wir stehen in keiner Verbindung zu FromSoftware, Nintendo oder Kadokawa und werden von diesen weder gesponsert noch unterstützt.",
            },
            {
                "title": "Was wir veröffentlichen",
                "desc": "News-Einordnungen, Systemguides, Charakter-Analysen, Release-Datum-Tracking und Network-Test-Berichte — mit klaren, belegten Antworten.",
            },
            {
                "title": "Quellen und Unabhängigkeit",
                "desc": "Fakten stammen aus offiziellen Nintendo/FromSoftware-Materialien und öffentlicher Berichterstattung. Analysen und Rankings sind unsere eigenen. Offizielle Screenshots sind den Rechteinhabern zugeordnet; Kommentare sind unabhängig.",
            },
            {
                "title": "Korrekturen und Updates",
                "desc": "Fehler korrigieren wir umgehend und aktualisieren Seiten mit dem Spielstand. Fehler gefunden? Nutzen Sie die Kontaktseite — jede Nachricht wird gelesen.",
            },
        ],
    },
    "ko": {
        "title": "사이트 소개",
        "lead": "Duskbloods Guide는 독립적인 팬 정보 허브입니다. FromSoftware 또는 Nintendo가 아닙니다.",
        "items": [
            {
                "title": "운영 주체",
                "desc": "Duskbloods Guide는 독립 편집팀이 팬 프로젝트로 운영합니다. FromSoftware, Nintendo, Kadokawa와 제휴·후원·보증 관계가 없습니다.",
            },
            {
                "title": "발행 콘텐츠",
                "desc": "뉴스 해설, 시스템 가이드, 캐릭터 분석, 출시일 추적, 네트워크 테스트 기록 등 출처 있는 명확한 답을 제공합니다.",
            },
            {
                "title": "출처와 독립성",
                "desc": "사실은 Nintendo/FromSoftware 공식 자료와 공개 보도에 근거합니다. 분석과 순위는 본 사이트의 의견입니다. 공식 스크린샷은 권리자를 표기하고, 논평은 독립적으로 작성합니다.",
            },
            {
                "title": "정정과 업데이트",
                "desc": "오류는 발견 즉시 정정하며 게임 진행에 맞춰 페이지를 갱신합니다. 문제가 있으면 연락처로 알려 주세요.",
            },
        ],
    },
    "it": {
        "title": "Su questo sito",
        "lead": "Duskbloods Guide è un hub informativo di fan indipendente. Non siamo FromSoftware né Nintendo.",
        "items": [
            {
                "title": "Chi gestisce il sito",
                "desc": "Duskbloods Guide è gestito da un team editoriale indipendente come progetto di fan. Non siamo affiliati a FromSoftware, Nintendo o Kadokawa, né da questi sponsorizzati o approvati.",
            },
            {
                "title": "Cosa pubblichiamo",
                "desc": "Approfondimenti di notizie, guide di sistema, schede personaggi, tracciamento della data di uscita e note sul network test — risposte chiare e con fonti.",
            },
            {
                "title": "Fonti e indipendenza",
                "desc": "I fatti provengono da materiali ufficiali Nintendo/FromSoftware e da report pubblici. Analisi e classifiche sono nostre. Screenshot ufficiali sono accreditati ai proprietari; i commenti sono indipendenti.",
            },
            {
                "title": "Correzioni e aggiornamenti",
                "desc": "Correggiamo gli errori e aggiorniamo le pagine con lo sviluppo del gioco. Trovato un errore? Usa la pagina contatti: leggiamo ogni messaggio.",
            },
        ],
    },
    "pt": {
        "title": "Sobre este site",
        "lead": "O Duskbloods Guide é um hub informativo de fãs independente. Não somos a FromSoftware nem a Nintendo.",
        "items": [
            {
                "title": "Quem gere o site",
                "desc": "O Duskbloods Guide é gerido por uma equipa editorial independente como projeto de fãs. Não somos afiliados à FromSoftware, Nintendo ou Kadokawa, nem patrocinados ou endossados por elas.",
            },
            {
                "title": "O que publicamos",
                "desc": "Análises de notícias, guias de sistemas, personagens, acompanhamento da data de lançamento e notas do network test — respostas claras e com fontes.",
            },
            {
                "title": "Fontes e independência",
                "desc": "Os factos vêm de materiais oficiais Nintendo/FromSoftware e reportagem pública. Análises e rankings são nossos. Capturas oficiais são creditadas aos titulares; o comentário é independente.",
            },
            {
                "title": "Correções e atualizações",
                "desc": "Corrigimos erros e atualizamos páginas conforme o jogo evolui. Encontrou algo errado? Use a página de contacto — lemos cada mensagem.",
            },
        ],
    },
    "ru": {
        "title": "О сайте",
        "lead": "Duskbloods Guide — независимый фан-информационный хаб. Мы не являемся FromSoftware или Nintendo.",
        "items": [
            {
                "title": "Кто ведёт сайт",
                "desc": "Duskbloods Guide ведёт независимая редакция как фан-проект. Мы не связаны с FromSoftware, Nintendo или Kadokawa и не получаем от них спонсорства или одобрения.",
            },
            {
                "title": "Что мы публикуем",
                "desc": "Разборы новостей, гайды по системам, персонажи, отслеживание даты релиза и заметки сетевого теста — понятные ответы с источниками.",
            },
            {
                "title": "Источники и независимость",
                "desc": "Факты — из официальных материалов Nintendo/FromSoftware и открытых публикаций. Анализ и рейтинги — наши. Официальные скриншоты указаны правообладателям; комментарии независимы.",
            },
            {
                "title": "Правки и обновления",
                "desc": "Мы исправляем ошибки и обновляем страницы по мере развития игры. Нашли неточность? Напишите через страницу контактов — читаем каждое сообщение.",
            },
        ],
    },
}


def update_locale(locale: str) -> None:
    path = MESSAGES / f"{locale}.json"
    data = json.loads(path.read_text(encoding="utf-8"))

    privacy = PRIVACY.get(locale) or PRIVACY_MORE.get(locale)
    if not privacy:
        raise SystemExit(f"missing privacy copy for {locale}")
    data["privacy"] = privacy

    if locale not in TERMS:
        raise SystemExit(f"missing terms copy for {locale}")
    data["terms"]["paragraphs"] = TERMS[locale]
    # keep title/description; optionally refresh description lightly
    if locale == "en":
        data["terms"]["description"] = (
            "Terms of use for Duskbloods Guide. Includes a reference to our Privacy Policy."
        )

    # contact email
    if "contact" in data and "email" in data["contact"]:
        data["contact"]["email"]["address"] = CONTACT_EMAIL[locale]

    # about.site block
    if "about" not in data:
        raise SystemExit(f"missing about in {locale}")
    site = ABOUT_SITE.get(locale)
    if not site:
        raise SystemExit(f"missing about.site for {locale}")
    data["about"]["site"] = site

    # Metadata descriptions for privacy (SEO accuracy)
    meta = data.get("Metadata", {}).get("privacy")
    if isinstance(meta, dict) and locale == "en":
        meta["title"] = "Privacy Policy — Duskbloods Guide"
        meta["description"] = (
            "How Duskbloods Guide handles data, cookies, Google Analytics, and advertising technologies. "
            "Unofficial The Duskbloods fan site."
        )

    path.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"updated {path.name}")


def main() -> None:
    for locale in LOCALES:
        update_locale(locale)


if __name__ == "__main__":
    main()
