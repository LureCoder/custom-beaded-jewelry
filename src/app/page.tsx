import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-[var(--gradient-hero)]">
        <div className="text-center px-4 space-y-6">
          <h1 className="text-4xl md:text-[var(--display1)] font-serif font-bold text-[var(--color-text-primary)]">
            一念清净
            <br />
            <span className="text-[var(--color-accent)]">一串菩提</span>
          </h1>
          <p className="text-base md:text-lg text-[var(--color-text-secondary)] max-w-md mx-auto">
            One pure thought, one mala bead
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button variant="default" size="lg">
              开始定制
            </Button>
            <Button variant="secondary" size="lg">
              浏览成品
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-[var(--color-text-muted)] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[var(--color-accent)] rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>
    </div>
  );
}
