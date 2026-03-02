/**
 * 料金（税抜金額を保持、合計・税額・税込は算出）
 */
export interface Pricing {
  /** 基本料金（税抜） */
  baseAmount: number;
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

export const emptyPricing: Pricing = {
  baseAmount: 0,
  travelFee: 0,
  optionAmount: 0,
  discount: 0,
  taxRate: DEFAULT_TAX_RATE,
  note: "",
};
