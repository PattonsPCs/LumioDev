export default function Shipping() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-accent/30 to-background py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-shipping-title">
            Shipping & Returns
          </h1>
          <p className="text-muted-foreground">Everything you need to know about delivery and returns</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-6">Shipping Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Standard Shipping</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Free on orders over $50</li>
                  <li>$10 flat rate on orders under $50</li>
                  <li>Delivery in 5-7 business days</li>
                  <li>Tracking number provided via email</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Express Shipping</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>$20 flat rate</li>
                  <li>Delivery in 2-3 business days</li>
                  <li>Available at checkout</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">International Shipping</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Available to Canada, UK, and Australia</li>
                  <li>Rates calculated at checkout</li>
                  <li>Delivery in 7-14 business days</li>
                  <li>Customs fees may apply</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Returns & Exchanges</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">30-Day Return Policy</h3>
                <p>
                  We want you to love your Lumio hoodie! If you're not completely satisfied, you can return it within 30 days of delivery for a full refund or exchange.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Return Requirements</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Items must be unworn and unwashed</li>
                  <li>Original tags must be attached</li>
                  <li>Items must be in original packaging</li>
                  <li>Return shipping is free within the US</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">How to Return</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Contact us at returns@lumio.com to initiate your return</li>
                  <li>We'll send you a prepaid return label</li>
                  <li>Pack your item securely in the original packaging</li>
                  <li>Drop it off at any authorized carrier location</li>
                  <li>Refunds processed within 5-7 business days after we receive your return</li>
                </ol>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
