export default function Terms() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-accent/30 to-background py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-terms-title">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">Last updated: October 31, 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl prose prose-lg">
        <div className="space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Agreement to Terms</h2>
            <p>
              By accessing and using Lumio's website, you accept and agree to be bound by the terms and provisions of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on Lumio's website for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Purchases</h2>
            <p>
              All purchases are subject to product availability. We reserve the right to limit quantities and discontinue products at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact</h2>
            <p>
              Questions about the Terms of Service should be sent to us at legal@lumio.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
