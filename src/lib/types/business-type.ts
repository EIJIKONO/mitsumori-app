/**
 * 業務種別（ドローン業務の分類）
 * テンプレート文の分岐・表示ラベルに使用
 */
export type BusinessType =
  | "roof_inspection"   // 屋根点検
  | "wall_inspection"   // 外壁点検
  | "bridge_inspection" // 橋梁点検
  | "solar_inspection"  // 太陽光点検
  | "aerial_photo"      // 空撮
  | "survey";           // 測量

export const BUSINESS_TYPE_LABELS: Record<BusinessType, string> = {
  roof_inspection: "屋根点検",
  wall_inspection: "外壁点検",
  bridge_inspection: "橋梁点検",
  solar_inspection: "太陽光点検",
  aerial_photo: "空撮",
  survey: "測量",
};

export const BUSINESS_TYPE_OPTIONS: { value: BusinessType; label: string }[] = (
  Object.entries(BUSINESS_TYPE_LABELS) as [BusinessType, string][]
).map(([value, label]) => ({ value, label }));
