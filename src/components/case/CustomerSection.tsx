"use client";

import type { Customer } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CustomerSectionProps {
  customer: Customer;
  onChange: (customer: Customer) => void;
}

export function CustomerSection({ customer, onChange }: CustomerSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">顧客情報</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="customerName">顧客名（必須）</Label>
          <Input
            id="customerName"
            value={customer.customerName ?? ""}
            onChange={(e) =>
              onChange({ ...customer, customerName: e.target.value })
            }
            placeholder="会社名・個人名"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactName">担当者名</Label>
          <Input
            id="contactName"
            value={customer.contactName ?? ""}
            onChange={(e) =>
              onChange({ ...customer, contactName: e.target.value })
            }
            placeholder="担当者名"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            type="email"
            value={customer.email ?? ""}
            onChange={(e) => onChange({ ...customer, email: e.target.value })}
            placeholder="example@company.co.jp"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">電話番号</Label>
          <Input
            id="phone"
            type="tel"
            value={customer.phone ?? ""}
            onChange={(e) => onChange({ ...customer, phone: e.target.value })}
            placeholder="03-1234-5678"
          />
        </div>
      </CardContent>
    </Card>
  );
}
