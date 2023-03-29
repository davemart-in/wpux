// loop through links
//let translatedCore = {"about":"紹介", "comments":"コメント", "customize":"カスタマイズ", "dashboard":"ダッシュボード", "design":"デザイン", "discussionSettings":"ディスカッション設定", "documentation":"ドキュメンテーション", "dotorg":"WordPress.org", "downloadLogo":"ロゴをダウンロード", "export":"エクスポート", "feedback":"フィードバック", "generalSettings":"一般設定", "header":"ヘッダー", "installedPlugins":"インストール済みプラグイン", "import":"インポート", "logout":"ログアウト", "manage":"管理", "media":"メディア", "mediaSettings":"メディア設定", "menus":"メニュー", "pages":"ページ", "permalinksSettings":"パーマリンク設定", "personalData":"個人データ", "pluginEditor":"プラグインエディター", "plugins":"プラグイン", "posts":"投稿", "privacySettings":"プライバシー設定", "profile":"プロフィール", "publish":"公開", "readingSettings":"表示設定", "siteHealth":"サイトの状態", "support":"サポート", "themeEditor":"テーマエディター", "themes":"テーマ", "updates":"アップデート", "users":"ユーザー", "widgets":"ウィジェット", "woo":"WooCommerce", "wooAbout":"WooCommerceについて", "wooAnalytics":"アナリティクス", "wooAnalyticsCategories":"カテゴリー", "wooAnalyticsCoupons":"クーポン", "wooAnalyticsDownloads":"ダウンロード", "wooAnalyticsOrders":"注文", "wooAnalyticsOverview":"概要", "wooAnalyticsProducts":"商品", "wooAnalyticsRevenue":"収益", "wooAnalyticsSettings":"設定", "wooAnalyticsStock":"在庫", "wooAnalyticsTaxes":"税金", "wooAnalyticsVariations":"バリエーション", "wooAttributes":"属性", "wooCategories":"カテゴリー", "wooCustomers":"顧客", "wooExtensions":"拡張機能", "wooHome":"ホーム", "wooLink":"WooCommerce.com", "wooManage":"管理", "wooMarketing":"マーケティング", "wooMarketingCoupons":"クーポン", "wooMarketingOverview":"概要", "wooOrders":"注文", "wooProducts":"商品", "wooProductsAll":"すべての商品", "wooReports":"レポート", "wooReviews":"レビュー", "wooSettings":"設定", "wooStatus":"ステータス", "wooTags":"タグ", "writingSettings":"書き込み設定"};
//let translatedDotcom = {"about":"紹介", "additionalCss":"追加のCSS", "addOns":"アドオン", "crowdsignal":"Crowdsignal", "comments":"コメント", "customize":"カスタマイズ", "design":"デザイン", "discussionSettings":"ディスカッション設定", "documentation":"ドキュメンテーション", "domains":"ドメイン", "dotorg":"WordPress.org", "downloadLogo":"ロゴをダウンロード", "editor":"エディター", "emails":"メール", "export":"エクスポート", "feedback":"フィードバック", "formResponses":"フォームの回答", "generalSettings":"一般設定", "header":"ヘッダー", "hostingConfiguration":"ホスティング設定", "inbox":"受信トレイ", "installedPlugins":"インストール済みプラグイン", "import":"インポート", "logout":"ログアウト", "manage":"管理", "media":"メディア", "mediaSettings":"メディア設定", "menus":"メニュー", "myHome":"マイホーム", "pages":"ページ", "performanceSettings":"パフォーマンス設定", "permalinksSettings":"パーマリンク設定", "personalData":"個人データ", "plans":"プラン", "pluginEditor":"プラグインエディター", "plugins":"プラグイン", "portfolio":"ポートフォリオ", "posts":"投稿", "privacySettings":"プライバシー設定", "profile":"プロフィール", "projectTags":"プロジェクトのタグ", "projectTypes":"プロジェクトの種類", "publish":"公開", "purchases":"購入", "ratings":"評価", "readingSettings":"表示設定", "siteHealth":"サイトの状態", "stats":"統計", "support":"サポート", "testimonials":"テスト", "themeEditor":"テーマエディター", "themes":"テーマ", "updates":"アップデート", "users":"ユーザー", "widgets":"ウィジェット", "woo":"WooCommerce", "wooAbout":"WooCommerceについて", "wooAnalytics":"アナリティクス", "wooAnalyticsCategories":"カテゴリー", "wooAnalyticsCoupons":"クーポン", "wooAnalyticsDownloads":"ダウンロード", "wooAnalyticsOrders":"注文", "wooAnalyticsOverview":"概要", "wooAnalyticsProducts":"商品", "wooAnalyticsRevenue":"収益", "wooAnalyticsSettings":"設定", "wooAnalyticsStock":"在庫", "wooAnalyticsTaxes":"税金", "wooAnalyticsVariations":"バリエーション", "wooAttributes":"属性", "wooCategories":"カテゴリー", "wooCustomers":"顧客", "wooExtensions":"拡張機能", "wooHome":"ホーム", "wooLink":"WooCommerce.com", "wooManage":"管理", "wooMarketing":"マーケティング", "wooMarketingCoupons":"クーポン", "wooMarketingOverview":"概要", "wooOrders":"注文", "wooProducts":"商品", "wooProductsAll":"すべての商品", "wooReports":"レポート", "wooReviews":"レビュー", "wooSettings":"設定", "wooStatus":"ステータス", "wooTags":"タグ", "writingSettings":"書き込み設定"};
// let tempDirectory = [];
// for (let key in data.nav.links) {
// 	if (data.nav.links.hasOwnProperty(key)) {
// 		// Get the link
// 		const link = data.nav.links[key];
// 		if (link.label) {
// 			tempDirectory.push({
// 				[key]: link.label
// 			});
// 		}
// 	}
// }
// console.log(JSON.stringify(tempDirectory));

// let tempDirectory = jsonData;
// for (let key in data.nav.links) {
// 	if (data.nav.links.hasOwnProperty(key)) {
// 		// Get the link
// 		const link = data.nav.links[key];
// 		if (link.label) {
// 			tempDirectory.links[key].label = translated[key];
// 		}
// 	}
// }
// console.log(JSON.stringify(tempDirectory));