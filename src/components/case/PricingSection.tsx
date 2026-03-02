"use client";

import type { Pricing } from "@/lib/types";
import { getPricingSummary } from "@/lib/calc/pricing";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PricingSectionProps {
  pricing: Pricing;
  onChange: (pricing: Pricing) => void;
}

function toNum(v: string): number {
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? 0 : n;
}

export function PricingSection({ pricing, onChange }: PricingSectionProps) {
  const summary = getPricingSummary(pricing);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">料金</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="baseAmount">基本料金（税抜）（必須）</Label>
            <Input
              id="baseAmount"
              type="number"
              min={0}
              value={pricing.baseAmount ?? 0}
              onChange={(e) =>
                onChange({ ...pricing, baseAmount: toNum(e.target.value) })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="travelFee">出張費（税抜）</Label>
            <Input
              id="travelFee"
              type="number"
              min={0}
              value={pricing.travelFee ?? 0}
              onChange={(e) =>
                onChange({ ...pricing, travelFee: toNum(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="optionAmount">オプション料金（税抜）</Label>
            <Input
              id="optionAmount"
              type="number"
              min={0}
              value={pricing.optionAmount ?? 0}
              onChange={(e) =>
                onChange({ ...pricing, optionAmount: toNum(e.target.value) })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discount">値引き（税抜）</Label>
            <Input
              id="discount"
              type="number"
              min={0}
              value={pricing.discount ?? 0}
              onChange={(e) =>
                onChange({ ...pricing, discount: toNum(e.target.value) })
              }
            />
          </div>
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
