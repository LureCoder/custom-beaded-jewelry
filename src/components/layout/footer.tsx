import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
      <div className="max-w-[400px] mx-auto px-6 py-16 text-center">
        <Link
          href="/"
          className="font-serif text-sm tracking-[0.15em] uppercase text-[var(--color-text-primary)]"
        >
          NIAN·ZHU
        </Link>

        <div className="mt-4 text-xs tracking-[0.1em] uppercase font-[300] text-[var(--color-text-muted)] flex items-center justify-center gap-3">
          <Link href="/shop" className="hover:text-[var(--color-accent)] transition-colors duration-500">商城</Link>
          <span>·</span>
          <Link href="/encyclopedia" className="hover:text-[var(--color-accent)] transition-colors duration-500">百科</Link>
          <span>·</span>
          <Link href="/about" className="hover:text-[var(--color-accent)] transition-colors duration-500">关于</Link>
        </div>

        <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
          <p className="text-xs font-[200] text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} NIAN·ZHU &middot; All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
