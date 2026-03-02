"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { BusinessType } from "@/lib/types/business-type";
import type { Pricing } from "@/lib/types/pricing";
import {
  PRICING_LINE_ITEM_LABELS,
  BUSINESS_TYPE_OPTIONS,
} from "@/lib/types";
import {
  getDefaultPricingForBusinessType,
  saveDefaultPricingForBusinessType,
  clearPresetForBusinessType,
} from "@/lib/data/default-pricing";
import { getPricingSummary } from "@/lib/calc/pricing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LINE_ITEM_KEYS = [
  "baseAmount",
  "equipmentFee",
  "applicationFee",
  "dataReportFee",
  "travelFee",
  "optionAmount",
  "discount",
] as const;

function toNum(v: string): number {
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? 0 : n;
}

export default function SettingsPricingPage() {
  const [activeType, setActiveType] = useState<BusinessType>("roof_inspection");
  const [form, setForm] = useState<Partial<Pricing>>({});

  useEffect(() => {
    setForm(getDefaultPricingForBusinessType(activeType));
  }, [activeType]);

  const handleSave = () => {
    saveDefaultPricingForBusinessType(activeType, form);
    const label =
      BUSINESS_TYPE_OPTIONS.find((o) => o.value === activeType)?.label ??
      activeType;
    window.alert(`${label}の目安を保存しました。`);
  };

  const handleReset = () => {
    clearPresetForBusinessType(activeType);
    setForm(getDefaultPricingForBusinessType(activeType));
    window.alert("初期値に戻しました。");
  };

  const summary = getPricingSummary({
    ...form,
    baseAmount: form.baseAmount ?? 0,
  } as Pricing);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">目安料金の設定</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            業務種別ごとの目安金額を別画面で設定できます。ここで保存した内容は「目安を反映」で案件に反映されます（ブラウザに保存）。
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/">案件一覧へ</Link>
        </Button>
      </div>

      <Tabs
        value={activeType}
        onValueChange={(v) => setActiveType(v as BusinessType)}
        className="w-full"
      >
        <TabsList className="flex h-auto flex-wrap gap-1 bg-muted p-1">
          {BUSINESS_TYPE_OPTIONS.map((opt) => (
            <TabsTrigger key={opt.value} value={opt.value} className="text-sm">
              {opt.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {BUSINESS_TYPE_OPTIONS.map((opt) => (
          <TabsContent key={opt.value} value={opt.value} className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {opt.label}の目安金額
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {LINE_ITEM_KEYS.map((key) => (
                    <div key={key} className="space-y-2">
                      <Label>
                        {PRICING_LINE_ITEM_LABELS[key]}
                        {key === "baseAmount" ? "（税抜）" : "（税抜）"}
                      </Label>
                      <Input
                        type="number"
                        min={0}
                        value={form[key] ?? 0}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            [key]: toNum(e.target.value),
                          }))
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label>料金備考（目安用）</Label>
                  <Textarea
                    value={form.note ?? ""}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, note: e.target.value }))
                    }
                    rows={3}
                    placeholder="この業務種別の目安に関するメモ"
                  />
                </div>
                <div className="rounded-md border bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">
                    税抜小計: ¥{summary.subtotal.toLocaleString()}（消費税10%: ¥
                    {summary.taxAmount.toLocaleString()}）
                  </p>
                  <p className="mt-1 font-semibold">
                    税込合計: ¥{summary.total.toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleSave}>この目安を保存</Button>
                  <Button variant="outline" onClick={handleReset}>
                    初期値に戻す
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
