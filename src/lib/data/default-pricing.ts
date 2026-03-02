import type { BusinessType } from "@/lib/types/business-type";
import type { Pricing } from "@/lib/types/pricing";
import { DEFAULT_TAX_RATE } from "@/lib/types/pricing";

/**
 * 業務種別ごとの目安料金（税抜）
 * 相場を参考にした初期値。案件で「目安を反映」したときに使用
 */
export const DEFAULT_PRICING_BY_BUSINESS_TYPE: Record<
  BusinessType,
  Partial<Pricing>
> = {
  roof_inspection: {
    baseAmount: 20000,
    equipmentFee: 0,
    applicationFee: 0,
    dataReportFee: 5000,
    travelFee: 0,
    optionAmount: 0,
    discount: 0,
    taxRate: DEFAULT_TAX_RATE,
    note: "屋根点検の相場は1件0.5～3万円程度。赤外線等は別途お見積もり。",
  },
  wall_inspection: {
    baseAmount: 80000,
    equipmentFee: 15000,
    applicationFee: 0,
    dataReportFee: 20000,
    travelFee: 0,
    optionAmount: 0,
    discount: 0,
    taxRate: DEFAULT_TAX_RATE,
    note: "外壁は面積・建物規模により変動。1000㎡あたり30万円～の目安。",
  },
  bridge_inspection: {
    baseAmount: 400000,
    equipmentFee: 100000,
    applicationFee: 50000,
    dataReportFee: 50000,
    travelFee: 0,
    optionAmount: 0,
    discount: 0,
    taxRate: DEFAULT_TAX_RATE,
    note: "橋梁点検は1日あたり60万円～の相場。規模・日数で変動。",
  },
  solar_inspection: {
    baseAmount: 80000,
    equipmentFee: 20000,
    applicationFee: 0,
    dataReportFee: 20000,
    travelFee: 0,
    optionAmount: 0,
    discount: 0,
    taxRate: DEFAULT_TAX_RATE,
    note: "太陽光点検は1MWあたり10万円～。赤外線撮影含む場合は高め。",
  },
  aerial_photo: {
    baseAmount: 75000,
    equipmentFee: 15000,
    applicationFee: 0,
    dataReportFee: 10000,
    travelFee: 0,
    optionAmount: 0,
    discount: 0,
    taxRate: DEFAULT_TAX_RATE,
    note: "空撮は1日7.5万円～。編集・特殊撮影はオプション。",
  },
  survey: {
    baseAmount: 100000,
    equipmentFee: 20000,
    applicationFee: 30000,
    dataReportFee: 30000,
    travelFee: 0,
    optionAmount: 0,
    discount: 0,
    taxRate: DEFAULT_TAX_RATE,
    note: "測量は範囲・精度により変動。申請が必要な場合は申請手数料を追加。",
  },
};

const STORAGE_KEY = "mitsumori-app-pricing-presets";

type PricingPresetMap = Partial<Record<BusinessType, Partial<Pricing>>>;

function isClient(): boolean {
  return typeof window !== "undefined";
}

function getOverrides(): PricingPresetMap {
  if (!isClient()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as PricingPresetMap;
  } catch {
    return {};
  }
}

function saveOverrides(map: PricingPresetMap): void {
  if (!isClient()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

/** 指定した業務種別の目安料金を返す（既存の pricing にマージして使う） */
export function getDefaultPricingForBusinessType(
  businessType: BusinessType
): Partial<Pricing> {
  const overrides = getOverrides();
  const base = DEFAULT_PRICING_BY_BUSINESS_TYPE[businessType] ?? {};
  const override = overrides[businessType] ?? {};
  return { ...base, ...override };
}

/** 現在の料金を業務種別の目安として保存（「こちら側で調整」用） */
export function saveDefaultPricingForBusinessType(
  businessType: BusinessType,
  pricing: Partial<Pricing>
): void {
  if (!isClient()) return;
  const overrides = getOverrides();
  overrides[businessType] = {
    ...(overrides[businessType] ?? {}),
    ...pricing,
  };
  saveOverrides(overrides);
}

