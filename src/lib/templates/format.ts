/** YYYY-MM-DD を 2025年3月15日 形式に */
export function formatDateJa(isoDate: string | undefined): string {
  if (!isoDate) return "－";
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return `${y}年${m}月${d}日`;
}

/** ISO 8601 の日付部分を 2025年3月15日 形式に */
export function formatDateTimeJa(iso: string | undefined): string {
  if (!iso) return "－";
  const datePart = iso.slice(0, 10);
  return formatDateJa(datePart);
}
