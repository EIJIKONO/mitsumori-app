/**
 * 顧客情報
 * 将来は顧客マスタとして独立し、案件から customerId で参照する形に拡張可能
 */
export interface Customer {
  /** 顧客名（会社名・個人名） */
  customerName: string;
  /** 担当者名 */
  contactName?: string;
  /** メールアドレス */
  email?: string;
  /** 電話番号 */
  phone?: string;
}

export const emptyCustomer: Customer = {
  customerName: "",
  contactName: "",
  email: "",
  phone: "",
};
