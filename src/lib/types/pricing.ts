/**
 * 料金（税抜金額を保持、合計・税額・税込は算出）
 * 内訳項目は見積書に明細として表示
 */
export interface Pricing {
  /** 基本料金（操縦・作業料）（税抜） */
  baseAmount: number;
  /** 機材使用料（税抜） */
  equipmentFee?: number;
  /** 申請手数料（許可・承認申請等）（税抜） */
  applicationFee?: number;
  /** データ処理・報告書作成料（税抜） */
  dataReportFee?: number;
  /** 出張費（税抜） */
  travelFee?: number;
  /** オプション料金（税抜） */
  optionAmount?: number;
  /** 値引き（税抜・正の数で減額） */
  discount?: number;
  /** 消費税率（0.1 = 10%）デフォルト 10% */
  taxRate?: number;
  /** 料金備考 */
  note?: string;
}

export const DEFAULT_TAX_RATE = 0.1;

/** 内訳項目のラベル（表示順） */
export const PRICING_LINE_ITEM_LABELS: Record<
  keyof Pick<
    Pricing,
    | "baseAmount"
    | "equipmentFee"
    | "applicationFee"
    | "dataReportFee"
    | "travelFee"
    | "optionAmount"
    | "discount"
  >,
  string
> = {
  baseAmount: "基本料金（操縦・作業料）",
  equipmentFee: "機材使用料",
  applicationFee: "申請手数料（許可・承認）",
  dataReportFee: "データ処理・報告書作成料",
  travelFee: "出張費",
  optionAmount: "オプション",
  discount: "値引き",
};

export const emptyPricing: Pricing = {
  baseAmount: 0,
  equipmentFee: 0,
  applicationFee: 0,
  dataReportFee: 0,
  travelFee: 0,
  optionAmount: 0,
  discount: 0,
  taxRate: DEFAULT_TAX_RATE,
  note: "",
};
