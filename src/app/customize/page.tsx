import { Button } from "@/components/ui/button";

export default function CustomizePage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 py-20">
        <h1 className="text-[var(--title1)] md:text-[var(--display2)] font-serif font-semibold text-center">
          定制你的念珠
        </h1>
        <p className="text-[var(--color-text-secondary)] text-center mt-3 max-w-lg mx-auto">
          三步完成专属设计
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            { step: "01", title: "选材", desc: "从天然木材、水晶、玛瑙中挑选" },
            { step: "02", title: "搭配", desc: "隔珠、计数器、流苏自由组合" },
            { step: "03", title: "圆满", desc: "预览成品，下单即开始手工制作" },
          ].map((item) => (
            <div
              key={item.step}
              className="text-center p-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)]"
            >
              <span className="text-[var(--color-accent)] text-3xl font-serif">{item.step}</span>
              <h3 className="text-[var(--title2)] font-serif font-semibold mt-4">{item.title}</h3>
              <p className="text-[var(--color-text-secondary)] mt-2">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="default" size="lg">开始定制</Button>
        </div>
      </section>
    </div>
  );
}
