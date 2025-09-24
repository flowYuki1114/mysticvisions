# MysticVisions - 占いサイト

神秘的な占いの世界へようこそ。MysticVisionsは、最新のテクノロジーと伝統的な占いの知識を融合した、モダンな占いWebサイトです。

## 🌟 特徴

- **多様な占い方法**: タロット、星座占い、数秘術、水晶占いなど
- **美しいUI/UX**: 神秘的なデザインとアニメーション
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- **ユーザー認証**: NextAuth.jsによる安全な認証システム
- **決済システム**: Stripeによる月額サブスクリプション
- **データベース**: Prisma + PostgreSQLによるデータ管理

## 🚀 技術スタック

- **フロントエンド**: Next.js 14, React 18, TypeScript
- **スタイリング**: Tailwind CSS, Framer Motion
- **認証**: NextAuth.js
- **データベース**: PostgreSQL, Prisma ORM
- **決済**: Stripe
- **デプロイ**: Vercel (推奨)

## 📦 セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd fortune-telling-site
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/fortune_telling_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. データベースのセットアップ

```bash
# Prismaのマイグレーション
npx prisma migrate dev

# データベースのシード（オプション）
npx prisma db seed
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 🎯 主要機能

### 無料占い
- タロット占い（3枚スプレッド）
- 星座占い（今日の運勢）
- 数秘術（基本診断）

### 有料占い
- 詳細な個人占い
- プロの占い師との相談
- 水晶占い
- 恋愛・仕事・家族運占い

### ユーザー機能
- アカウント登録・ログイン
- 占い結果の保存
- ダッシュボード
- 決済・サブスクリプション管理

## 💰 料金プラン

### フリープラン
- 基本的な占いを無料で利用
- 1日3回まで
- 結果の保存（7日間）

### ベーシックプラン（月額980円）
- 全種類の無料占い
- 詳細な解説とアドバイス
- 結果の保存（30日間）
- 広告なし体験

### プレミアムプラン（月額2,980円）
- ベーシックプランの全機能
- プロ占い師との個別相談（月2回）
- 無制限の占い回数
- 結果の永続保存

## 🔧 開発

### データベースの管理

```bash
# データベースのリセット
npx prisma migrate reset

# データベースの確認
npx prisma studio
```

### 型チェック

```bash
npm run type-check
```

### リンティング

```bash
npm run lint
```

## 📱 デプロイ

### Vercelでのデプロイ

1. Vercelアカウントを作成
2. GitHubリポジトリを接続
3. 環境変数を設定
4. デプロイ

### 環境変数の設定（本番）

本番環境では以下の環境変数を設定してください：

- `DATABASE_URL`: 本番データベースのURL
- `NEXTAUTH_URL`: 本番サイトのURL
- `NEXTAUTH_SECRET`: 強力なシークレットキー
- `STRIPE_SECRET_KEY`: 本番用Stripeシークレットキー
- `STRIPE_WEBHOOK_SECRET`: Stripe Webhookシークレット

## 🤝 貢献

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 📞 サポート

質問やサポートが必要な場合は、以下の方法でお問い合わせください：

- メール: support@mysticvisions.com
- 電話: 03-1234-5678

## 🙏 謝辞

- [Next.js](https://nextjs.org/) - Reactフレームワーク
- [Tailwind CSS](https://tailwindcss.com/) - CSSフレームワーク
- [Stripe](https://stripe.com/) - 決済システム
- [Prisma](https://prisma.io/) - データベースORM
- [NextAuth.js](https://next-auth.js.org/) - 認証ライブラリ

---

**MysticVisions** - 神秘的な占いの世界へようこそ ✨
