"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Pricing } from "@/lib/types";
import type { BusinessType } from "@/lib/types/business-type";
import { PRICING_LINE_ITEM_LABELS, BUSINESS_TYPE_OPTIONS } from "@/lib/types";
import { getPricingSummary } from "@/lib/calc/pricing";
import {
  getDefaultPricingForBusinessType,
  saveDefaultPricingForBusinessType,
  clearPresetForBusinessType,
} from "@/lib/data/default-pricing";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";

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
  const [showPresetEditor, setShowPresetEditor] = useState(false);
  const [presetType, setPresetType] = useState<BusinessType>("aerial_photo");
  const [presetForm, setPresetForm] = useState<Partial<Pricing>>({});

  useEffect(() => {
    if (showPresetEditor) {
      setPresetForm(getDefaultPricingForBusinessType(presetType));
    }
  }, [showPresetEditor, presetType]);

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

  const handleSavePreset = () => {
    saveDefaultPricingForBusinessType(presetType, presetForm);
    window.alert(`${BUSINESS_TYPE_OPTIONS.find((o) => o.value === presetType)?.label ?? presetType}の目安を保存しました。`);
  };

  const handleResetPreset = () => {
    clearPresetForBusinessType(presetType);
    setPresetForm(getDefaultPricingForBusinessType(presetType));
    window.alert("初期値に戻しました。");
  };

  const customItems = pricing.customItems ?? [];

  const addCustomItem = () => {
    onChange({
      ...pricing,
      customItems: [
        ...customItems,
        { id: crypto.randomUUID(), label: "", amount: 0 },
      ],
    });
  };

  const updateCustomItem = (
    id: string,
    patch: { label?: string; amount?: number }
  ) => {
    onChange({
      ...pricing,
      customItems: customItems.map((i) =>
        i.id === id ? { ...i, ...patch } : i
      ),
    });
  };

  const removeCustomItem = (id: string) => {
    onChange({
      ...pricing,
      customItems: customItems.filter((i) => i.id !== id),
    });
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
          「目安を反映」は業務種別ごとの目安料金を反映します。「現在の金額を目安として保存」で、この案件の設定を今後の目安として保存できます。
          <Link
            href="/settings/pricing"
            className="ml-1 text-primary underline hover:no-underline"
          >
            目安の金額は別画面で設定
          </Link>
          （ブラウザに保存）
        </p>

        {/* 目安を編集（別枠で変更しやすいUI） */}
        <div className="rounded-lg border border-dashed bg-muted/30 p-3">
          <button
            type="button"
            className="flex w-full items-center justify-between text-left text-sm font-medium text-foreground"
            onClick={() => setShowPresetEditor((v) => !v)}
          >
            <span>業務種別ごとの目安を編集</span>
            {showPresetEditor ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {showPresetEditor && (
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label>目安を編集する業務種別</Label>
                <Select
                  value={presetType}
                  onValueChange={(v) => setPresetType(v as BusinessType)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BUSINESS_TYPE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {LINE_ITEM_KEYS.map((key) => (
                  <div key={key} className="space-y-1">
                    <Label className="text-xs">
                      {PRICING_LINE_ITEM_LABELS[key]}
                    </Label>
                    <Input
                      type="number"
                      min={0}
                      value={presetForm[key] ?? 0}
                      onChange={(e) =>
                        setPresetForm((prev) => ({
                          ...prev,
                          [key]: toNum(e.target.value),
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                <Label className="text-xs">料金備考（目安用）</Label>
                <Textarea
                  value={presetForm.note ?? ""}
                  onChange={(e) =>
                    setPresetForm((prev) => ({ ...prev, note: e.target.value }))
                  }
                  rows={2}
                  className="text-sm"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" size="sm" onClick={handleSavePreset}>
                  この目安を保存
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleResetPreset}
                >
                  初期値に戻す
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* 固定項目 */}
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

        {/* 追加項目 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>追加項目（税抜）</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addCustomItem}
            >
              <Plus className="mr-1 h-4 w-4" />
              項目を追加
            </Button>
          </div>
          {customItems.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              「項目を追加」で、レンタル料・特別機材費など任意の項目を追加できます。
            </p>
          ) : (
            <ul className="space-y-2">
              {customItems.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center gap-2 rounded border bg-muted/30 p-2"
                >
                  <Input
                    placeholder="項目名"
                    value={item.label}
                    onChange={(e) =>
                      updateCustomItem(item.id, { label: e.target.value })
                    }
                    className="max-w-[180px]"
                  />
                  <Input
                    type="number"
                    min={0}
                    placeholder="金額"
                    value={item.amount || ""}
                    onChange={(e) =>
                      updateCustomItem(item.id, {
                        amount: toNum(e.target.value),
                      })
                    }
                    className="w-28"
                  />
                  <span className="text-xs text-muted-foreground">円</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => removeCustomItem(item.id)}
                    aria-label="削除"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
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
