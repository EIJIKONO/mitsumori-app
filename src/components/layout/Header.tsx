import Link from "next/link";

export function Header() {
  return (
    <header className="no-print sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-12 items-center px-4">
        <Link
          href="/"
          className="text-lg font-semibold text-foreground hover:text-primary"
        >
          ドローン見積・書類作成
        </Link>
        <nav className="ml-6 flex gap-4 text-sm">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
          >
            案件一覧
          </Link>
          <Link
            href="/settings/pricing"
            className="text-muted-foreground hover:text-foreground"
          >
            目安料金
          </Link>
        </nav>
      </div>
    </header>
  );
}
