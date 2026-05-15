export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 py-20">
        <h1 className="text-[var(--title1)] md:text-[var(--display2)] font-serif font-semibold text-center">
          关于空性念珠
        </h1>
        <p className="text-[var(--color-text-secondary)] text-center mt-3 max-w-lg mx-auto">
          匠心传承，一念清净
        </p>

        <div className="mt-16 max-w-3xl mx-auto space-y-8 text-[var(--color-text-secondary)] leading-relaxed">
          <p>
            空性念珠 (Kongxing Mala) 致力于将传统念珠制作工艺与现代设计相结合，
            为修行者与爱好者提供高品质的手工定制念珠。
          </p>
          <p>
            每一颗珠子都经过匠人精心挑选与打磨，
            每一串念珠都承载着制作者的祝福与用心。
          </p>
        </div>
      </section>
    </div>
  );
}
