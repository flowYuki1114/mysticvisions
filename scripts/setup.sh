#!/bin/bash

echo "🌟 MysticVisions セットアップスクリプト"
echo "=================================="

# 依存関係のインストール
echo "📦 依存関係をインストール中..."
npm install

# 環境変数ファイルの作成
echo "🔧 環境変数ファイルを作成中..."
if [ ! -f .env.local ]; then
    cp env.example .env.local
    echo "✅ .env.local ファイルが作成されました"
    echo "⚠️  環境変数を設定してください"
else
    echo "✅ .env.local ファイルは既に存在します"
fi

# データベースのセットアップ
echo "🗄️  データベースをセットアップ中..."
npx prisma generate
npx prisma db push

echo ""
echo "🎉 セットアップが完了しました！"
echo ""
echo "次のステップ:"
echo "1. .env.local ファイルで環境変数を設定してください"
echo "2. データベースの接続情報を確認してください"
echo "3. npm run dev で開発サーバーを起動してください"
echo ""
echo "✨ MysticVisions で神秘的な占いの世界をお楽しみください！"
