export default function ShopPage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 py-20">
        <h1 className="text-[var(--title1)] md:text-[var(--display2)] font-serif font-semibold text-center">
          商城
        </h1>
        <p className="text-[var(--color-text-secondary)] text-center mt-3">
          精选成品念珠，即刻请购
        </p>

        <div className="text-center mt-20 text-[var(--color-text-muted)]">
          <p>商品即将上架</p>
        </div>
      </section>
    </div>
  );
}
