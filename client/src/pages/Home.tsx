import { useState } from "react";
import { useLocation } from "wouter";
import Hero from "@/components/Hero";
import ProductCard, { type Product } from "@/components/ProductCard";
import LookbookCard from "@/components/LookbookCard";
import NewsletterModal from "@/components/NewsletterModal";
import { Button } from "@/components/ui/button";
import { Sparkles, Package, RefreshCw } from "lucide-react";
import SunBeams from "@/components/SunBeams";
import SunLogo from "@/components/SunLogo";
import yellowHoodie from "@assets/IMG_9431_1761942244389.png";
import sandHoodie from "@assets/IMG_9362_1761942225345.png";
import coralHoodie from "@assets/IMG_9432_1761942244391.png";
import lookbookYellow from "@assets/Tropical realistic on beach_1761942261349.png";
import lookbookCoral from "@assets/Berries realistic on beach_1761942261350.png";

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Sunshine Hoodie",
    price: 89,
    image: yellowHoodie,
    colors: ["#F0B429", "#F09B9B", "#E8D5B7"],
    inStock: true,
    isNew: true,
  },
  {
    id: "2",
    name: "Coral Breeze Hoodie",
    price: 89,
    image: coralHoodie,
    colors: ["#F09B9B", "#F0B429", "#E8D5B7"],
    inStock: true,
    isNew: true,
  },
  {
    id: "3",
    name: "Sandy Beach Hoodie",
    price: 89,
    image: sandHoodie,
    colors: ["#E8D5B7", "#F0B429", "#F09B9B"],
    inStock: true,
  },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [showNewsletter, setShowNewsletter] = useState(false);

  return (
    <div className="min-h-screen relative">
      <SunBeams className="opacity-20" />
      <Hero onShopClick={() => setLocation("/shop")} />

      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-featured-title">
            Featured Hoodies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Premium 350gsm brushed fleece. Bold colors. Photogenic style. Each hoodie is designed to make you stand out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(p) => console.log("Add to cart:", p.name)}
              onClick={() => setLocation(`/product/${product.id}`)}
            />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="rounded-full shadow-lg" onClick={() => setLocation("/shop")} data-testid="button-view-all">
            View All Products
          </Button>
        </div>
      </section>

      <section className="bg-gradient-to-br from-accent/30 via-secondary/20 to-accent/30 py-16 relative">
        <div className="absolute top-10 left-10 opacity-20">
          <SunLogo size={80} animate={true} />
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <SunLogo size={60} animate={true} />
        </div>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold" data-testid="text-feature-premium">Premium Quality</h3>
              <p className="text-muted-foreground">
                350gsm brushed fleece with reinforced seams. Built to last, designed to impress.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold" data-testid="text-feature-shipping">Free Shipping</h3>
              <p className="text-muted-foreground">
                Free shipping on all orders over $50. Fast delivery straight to your door.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <RefreshCw className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold" data-testid="text-feature-returns">Easy Returns</h3>
              <p className="text-muted-foreground">
                Not satisfied? Return within 30 days for a full refund. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-lookbook-preview-title">
            Lookbook Preview
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how our hoodies look in real life. Fresh styles, bold colors, unforgettable vibes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          <LookbookCard
            image={lookbookYellow}
            title="Urban Sunset"
            onClick={() => setLocation("/lookbook")}
          />
          <LookbookCard
            image={lookbookCoral}
            title="Beach Vibes"
            onClick={() => setLocation("/lookbook")}
          />
        </div>

        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full"
            onClick={() => setLocation("/lookbook")}
            data-testid="button-explore-lookbook"
          >
            Explore Full Lookbook
          </Button>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary/10 via-accent/30 to-primary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-newsletter-cta">
            Get 10% Off Your First Order
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Subscribe to our newsletter for exclusive deals, new arrivals, and style inspiration.
          </p>
          <Button size="lg" className="rounded-full shadow-lg" onClick={() => setShowNewsletter(true)} data-testid="button-subscribe">
            Subscribe Now
          </Button>
        </div>
      </section>

      <NewsletterModal isOpen={showNewsletter} onClose={() => setShowNewsletter(false)} />
    </div>
  );
}
