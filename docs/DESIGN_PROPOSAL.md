# ドローン見積・書類自動生成アプリ 設計提案書

## 1. 画面一覧

### 1.1 画面構成（MVP）

| 画面ID | 画面名 | 役割 | 主な要素 |
|--------|--------|------|----------|
| **TOP** | トップ / 案件一覧 | アプリの入口。保存済み案件の一覧表示・新規作成・編集・複製・削除 | 案件カード一覧、新規作成ボタン、検索（将来用の余地） |
| **CASE** | 案件入力 | 顧客情報・案件情報・飛行条件・料金を一括入力 | タブまたはセクションで「顧客」「案件」「飛行条件」「料金」を切り替え |
| **OUTPUT** | 出力一覧 | 4種類の出力をタブで切り替えて表示・コピー | 見積書 / 作業計画書 / 安全チェックリスト / メール文 のタブ、コピーボタン、印刷用レイアウト（見積のみ） |

### 1.2 ルーティング（Next.js App Router）

```
/                 … トップ（案件一覧）
/case/new         … 新規案件作成
/case/[id]        … 案件編集
/case/[id]/output … 出力表示（見積・計画書・チェックリスト・メール）
```

- 案件一覧から「新規」「編集」「複製」で `/case/new` または `/case/[id]` へ遷移。
- 案件保存後、または「出力を見る」で `/case/[id]/output` へ遷移。

### 1.3 将来拡張を想定した画面（MVP外）

- `/customers` … 顧客管理
- `/templates` … テンプレート管理
- `/case/[id]/proposal` … 提案書
- `/case/[id]/report` … 報告書
- `/case/[id]/application` … 申請準備

---

## 2. データ項目一覧

### 2.1 顧客情報（Customer）

| 項目 | 型 | 必須 | 備考 |
|------|-----|------|------|
| customerName | string | ○ | 顧客名（会社名・個人名） |
| contactName | string | - | 担当者名 |
| email | string | - | メールアドレス |
| phone | string | - | 電話番号 |

※ 将来は顧客マスタとして独立し、案件から参照する形に拡張可能。

### 2.2 案件情報（Case / Project）

| 項目 | 型 | 必須 | 備考 |
|------|-----|------|------|
| id | string | ○ | UUID（クライアント生成でOK） |
| **顧客** | | | |
| customer | Customer | ○ | 上記顧客情報を埋め込み |
| **案件** | | | |
| siteName | string | ○ | 現場名 |
| siteAddress | string | - | 現場住所 |
| businessType | BusinessType | ○ | 業務種別（後述） |
| scheduledDate | string | - | 作業予定日（ISO 8601 または YYYY-MM-DD） |
| aircraft | string | - | 使用機体 |
| workerCount | number | - | 作業人数 |
| workDays | number | - | 作業日数 |
| memo | string | - | 備考 |
| **飛行・現場条件** | | | |
| isDID | boolean | - | DID（人口集中地区）該当の有無 |
| isBVLOS | boolean | - | 目視外飛行の有無 |
| isNightFlight | boolean | - | 夜間飛行の有無 |
| isOverRoad | boolean | - | 道路上空飛行の有無 |
| needsThirdPartyManagement | boolean | - | 第三者立入管理の必要有無 |
| surroundingCondition | string | - | 周辺建物の状況 |
| hasLandingArea | boolean | - | 離着陸場所の確保可否 |
| needsAssistant | boolean | - | 補助者の必要有無 |
| safetyNotes | string | - | 安全上の特記事項 |
| **料金** | | | |
| pricing | Pricing | ○ | 料金内訳（後述） |
| **メタ** | | | |
| createdAt | string | - | 作成日時（ISO 8601） |
| updatedAt | string | - | 更新日時（ISO 8601） |

### 2.3 業務種別（BusinessType）

```ts
type BusinessType =
  | 'roof_inspection'   // 屋根点検
  | 'wall_inspection'   // 外壁点検
  | 'bridge_inspection' // 橋梁点検
  | 'solar_inspection'  // 太陽光点検
  | 'aerial_photo'      // 空撮
  | 'survey';           // 測量
```

表示用ラベルは別マッピングで保持し、テンプレート分岐にも使用。

### 2.4 料金（Pricing）

| 項目 | 型 | 必須 | 備考 |
|------|-----|------|------|
| baseAmount | number | ○ | 基本料金（税抜） |
| travelFee | number | - | 出張費（税抜） |
| optionAmount | number | - | オプション料金（税抜） |
| discount | number | - | 値引き（税抜・正の数で減額） |
| taxRate | number | - | 消費税率（0.1 = 10%、デフォルト10） |
| note | string | - | 料金備考 |

合計・税額・税込は算出項目（getter または utility で計算）。

---

## 3. ディレクトリ構成

```
mitsumori-app/
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── components.json          # shadcn/ui 用
├── .env.local               # 将来のAPIキー等（gitignore）
│
├── docs/
│   └── DESIGN_PROPOSAL.md   # 本設計書
│
├── src/
│   ├── app/
│   │   ├── layout.tsx       # 共通レイアウト（ヘッダー、言語）
│   │   ├── page.tsx         # トップ：案件一覧
│   │   ├── globals.css
│   │   │
│   │   ├── case/
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx       # 案件編集
│   │   │   │   └── output/
│   │   │   │       └── page.tsx   # 出力一覧（4タブ）
│   │   │   └── layout.tsx         # 案件まわり共通（任意）
│   │   │
│   │   └── api/                   # 将来：REST API
│   │       └── cases/
│   │           └── route.ts       # GET/POST（将来用）
│   │
│   ├── components/
│   │   ├── ui/                    # shadcn/ui コンポーネント
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── AppShell.tsx
│   │   ├── case/
│   │   │   ├── CaseForm.tsx       # 案件入力フォーム全体
│   │   │   ├── CustomerSection.tsx
│   │   │   ├── ProjectSection.tsx
│   │   │   ├── FlightConditionSection.tsx
│   │   │   └── PricingSection.tsx
│   │   ├── case-list/
│   │   │   ├── CaseList.tsx
│   │   │   └── CaseCard.tsx
│   │   └── output/
│   │       ├── OutputTabs.tsx     # 4出力のタブ
│   │       ├── EstimateView.tsx   # 見積書（印刷用レイアウト）
│   │       ├── WorkPlanView.tsx   # 作業計画書
│   │       ├── SafetyChecklistView.tsx
│   │       └── EmailView.tsx      # メール文
│   │
│   ├── lib/
│   │   ├── types/
│   │   │   ├── index.ts           # 再エクスポート
│   │   │   ├── customer.ts
│   │   │   ├── case.ts
│   │   │   ├── pricing.ts
│   │   │   └── business-type.ts
│   │   ├── store/
│   │   │   └── case-store.ts      # 案件の永続化（localStorage 等）
│   │   ├── calc/
│   │   │   └── pricing.ts         # 合計・税計算
│   │   └── templates/
│   │       ├── index.ts
│   │       ├── estimate.ts        # 見積書文面
│   │       ├── work-plan.ts       # 作業計画書文面
│   │       ├── safety-checklist.ts
│   │       ├── email.ts
│   │       └── business-labels.ts # 業務種別ラベル・分岐用
│   │
│   └── data/
│       └── mock-cases.ts          # ダミーデータ（初期表示・開発用）
│
└── public/
    └── (静的ファイル)
```

### 設計の意図

- **型**: `lib/types/` で案件・顧客・料金を厳密に定義し、アプリ全体で共有。
- **テンプレート**: `lib/templates/` で文面を集約。`businessType` による分岐はここで行い、将来のテンプレ管理もここに追加しやすい。
- **永続化**: `lib/store/case-store.ts` で localStorage をラップ。後から API/DB に差し替え可能なインターフェースにしておく。
- **出力**: 各 View は「表示＋コピー」を担当。見積書は印刷用クラスを付与し、将来の PDF 出力は同じ DOM または同一データソースを流用できるようにする。

---

## 4. 実装ステップ

### Phase 0: 環境構築（事前準備）

1. Next.js（App Router）+ TypeScript プロジェクト作成
2. Tailwind CSS 導入
3. shadcn/ui 初期化と必要なコンポーネント追加（Button, Input, Card, Tabs, Label, Select, Checkbox, Textarea 等）
4. 日本語フォント・ベーススタイル（globals.css）の設定

### Phase 1: データ層・型・ダミーデータ

1. **型定義**
   - `Customer`, `Pricing`, `BusinessType`, `Case` を `lib/types/` に作成
   - 合計・税込を計算する `lib/calc/pricing.ts` を実装
2. **ストア**
   - `lib/store/case-store.ts` で localStorage に案件を保存・取得・更新・削除・複製する API を定義
3. **ダミーデータ**
   - `lib/data/mock-cases.ts` に 1〜2 件のサンプル案件を用意し、初回表示または開発時に利用

### Phase 2: 画面骨組みと案件 CRUD

1. **レイアウト**
   - `layout.tsx` でヘッダー（アプリ名、案件一覧リンク）を共通化
2. **トップ（案件一覧）**
   - 保存済み案件を一覧表示（CaseCard）
   - 新規作成 → `/case/new`
   - 編集 → `/case/[id]`
   - 複製 → 新 ID でコピーして `/case/new?copy=id` または保存後に `/case/[id]`
   - 削除（確認付き）
3. **案件入力画面**
   - `/case/new` と `/case/[id]` で同一フォームを使用
   - 顧客・案件・飛行条件・料金のセクションを実装し、保存・「出力へ」ボタンを配置

### Phase 3: 出力機能（4種類）

1. **出力ルート**
   - `/case/[id]/output` でタブを表示（見積書 / 作業計画書 / 安全チェックリスト / メール文）
2. **テンプレート**
   - `lib/templates/` に業務種別を考慮した文面生成関数を実装（まずは共通文面でOK、種別分岐は少なくても可）
3. **見積書**
   - 印刷用レイアウトで表示、金額明細・合計・消費税を表示。コピーボタンでクリップボードにテキストまたは HTML をコピー
4. **作業計画書**
   - 案件・飛行条件から項目を埋めた文面を表示、コピー可能に
5. **安全チェックリスト**
   - チェック項目一覧を表示、コピー可能に
6. **顧客提出メール文**
   - 宛名・挨拶・見積送付案内・要約・確認依頼・署名を組み立てて表示、コピー可能に

### Phase 4: 仕上げ・README

1. 見積書の印刷用 CSS（`@media print`）を調整
2. ダミーデータが一覧・編集・出力で一通り使えることを確認
3. README に「概要・技術スタック・セットアップ・起動方法・今後の拡張」を記載

---

## 5. 今後の拡張時の方針（MVP では実装しない）

- **PDF 出力**: ブラウザの印刷から PDF 保存、または `@react-pdf/renderer` / Puppeteer 等で同じレイアウトを PDF 化。データは既存の型のまま利用可能。
- **顧客管理**: `Customer` を独立したエンティティにし、`case.customerId` で参照。`/customers` と API を追加。
- **案件管理**: 一覧のフィルタ・検索・ステータス（見積中・受注・完了等）を追加。`Case` 型に `status` 等を追加。
- **テンプレート管理**: `lib/templates/` の文面を DB または JSON で保持し、画面から編集できるようにする。
- **提案書・報告書・申請準備**: `/case/[id]/proposal` 等のルートと、対応するテンプレート・View を追加。データは既存の `Case` を流用。

---

以上が画面一覧・データ項目・ディレクトリ構成・実装ステップの提案です。この方針で問題なければ、Phase 0 から実装に進めます。
