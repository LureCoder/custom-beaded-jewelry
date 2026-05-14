import Link from "next/link";

const footerSections = [
  {
    title: "导航",
    links: [
      { href: "/", label: "首页" },
      { href: "/customize", label: "定制" },
      { href: "/shop", label: "商城" },
      { href: "/encyclopedia", label: "百科" },
      { href: "/about", label: "关于" },
    ],
  },
  {
    title: "支持",
    links: [
      { href: "/shipping", label: "配送说明" },
      { href: "/returns", label: "退换政策" },
      { href: "/care", label: "保养指南" },
      { href: "/contact", label: "联系我们" },
    ],
  },
  {
    title: "关注",
    links: [
      { href: "#", label: "微信公众号" },
      { href: "#", label: "小红书" },
      { href: "#", label: "Instagram" },
    ],
  },
];

function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-serif text-lg tracking-wider text-[var(--color-text-primary)]"
            >
              <span className="text-[var(--color-accent)]">念珠</span>工坊
            </Link>
            <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed max-w-xs">
              手工定制念佛念珠，天然材质，匠人精制。一念清净，一串菩提。
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-3">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-border)] text-center text-xs text-[var(--color-text-muted)]">
          <p>&copy; {new Date().getFullYear()} 念珠工坊. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
