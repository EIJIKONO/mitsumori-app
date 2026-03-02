# GitHub へのプッシュ手順

コミットは済んでいます。以下の手順で GitHub にプッシュしてください。

## 1. GitHub でリポジトリを作成

1. [GitHub](https://github.com) にログイン
2. 右上の「+」→「New repository」
3. Repository name: `mitsumori-app`（任意の名前で可）
4. Public / Private を選択
5. **「Add a README file」等は追加しない**（既にローカルにあるため）
6. 「Create repository」をクリック

## 2. リモートを追加してプッシュ

GitHub でリポジトリ作成後、表示される URL を使ってください。

**HTTPS の場合（推奨）:**

```bash
git remote add origin https://github.com/あなたのユーザー名/mitsumori-app.git
git push -u origin main
```

**SSH の場合:**

```bash
git remote add origin git@github.com:あなたのユーザー名/mitsumori-app.git
git push -u origin main
```

リポジトリ名を変えた場合は、URL の `mitsumori-app` 部分をその名前に合わせてください。

## 補足

- 初回プッシュ時に GitHub のログインを求められた場合は、ブラウザまたはトークンで認証します。
- GitHub CLI (`gh`) を入れている場合は、`gh repo create mitsumori-app --public --source=. --push` でリポジトリ作成とプッシュをまとめて実行できます。
