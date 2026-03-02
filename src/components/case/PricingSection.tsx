"use client";

import type { Pricing } from "@/lib/types";
import type { BusinessType } from "@/lib/types/business-type";
import { PRICING_LINE_ITEM_LABELS } from "@/lib/types";
import { getPricingSummary } from "@/lib/calc/pricing";
import {
  getDefaultPricingForBusinessType,
  saveDefaultPricingForBusinessType,
} from "@/lib/data/default-pricing";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LINE_ITEM_KEYS = [
  "baseAmount",
  "equipmentFee",
  "applicationFee",
  "dataReportFee",
  "travelFee",
  "optionAmount",
  "discount",
] as const;

interface PricingSectionProps {
  pricing: Pricing;
  onChange: (pricing: Pricing) => void;
  businessType?: BusinessType;
}

function toNum(v: string): number {
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? 0 : n;
}

export function PricingSection({
  pricing,
  onChange,
  businessType,
}: PricingSectionProps) {
  const summary = getPricingSummary(pricing);

  const handleApplyDefault = () => {
    if (!businessType) return;
    const defaults = getDefaultPricingForBusinessType(businessType);
    onChange({ ...pricing, ...defaults });
  };

  const handleSaveAsDefault = () => {
    if (!businessType) return;
    saveDefaultPricingForBusinessType(businessType, pricing);
    window.alert("現在の金額をこの業務種別の目安として保存しました。");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-base">料金</CardTitle>
          <div className="flex flex-wrap gap-2">
            {businessType && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleApplyDefault}
                >
                  目安を反映
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleSaveAsDefault}
                >
                  現在の金額を目安として保存
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground">
          「目安を反映」は業務種別ごとの目安料金を反映します。「現在の金額を目安として保存」で、この案件の設定を今後の目安として保存できます（ブラウザごとに保存）。
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {LINE_ITEM_KEYS.map((key) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key}>
                {PRICING_LINE_ITEM_LABELS[key]}
                {key === "baseAmount" ? "（税抜）（必須）" : "（税抜）"}
              </Label>
              <Input
                id={key}
                type="number"
                min={0}
                value={pricing[key] ?? 0}
                onChange={(e) =>
                  onChange({ ...pricing, [key]: toNum(e.target.value) })
                }
              />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Label htmlFor="pricingNote">料金備考</Label>
          <Textarea
            id="pricingNote"
            value={pricing.note ?? ""}
            onChange={(e) =>
              onChange({ ...pricing, note: e.target.value || undefined })
            }
            placeholder="交通費は実費を別途請求する場合があります。"
            rows={2}
          />
        </div>
        <div className="rounded-md border bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            税抜小計: ¥{summary.subtotal.toLocaleString()}（消費税{" "}
            {(summary.taxRate * 100).toFixed(0)}%: ¥
            {summary.taxAmount.toLocaleString()}）
          </p>
          <p className="mt-1 text-lg font-semibold">
            税込合計: ¥{summary.total.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
