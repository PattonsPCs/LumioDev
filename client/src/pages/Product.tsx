import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard, { type Product } from "@/components/ProductCard";
import { ShoppingCart, Star } from "lucide-react";
import yellowHoodie from "@assets/generated_images/Yellow_hoodie_product_photo_259447ce.png";
import magentaHoodie from "@assets/generated_images/Magenta_hoodie_product_photo_9165875a.png";
import lavenderHoodie from "@assets/generated_images/Lavender_hoodie_product_photo_12aea468.png";

const relatedProducts: Product[] = [
  {
    id: "2",
    name: "Berry Burst Hoodie",
    price: 89,
    image: magentaHoodie,
    colors: ["#FF5A9E", "#FFD54A", "#D6C7FF"],
    inStock: true,
  },
  {
    id: "3",
    name: "Lavender Dream Hoodie",
    price: 89,
    image: lavenderHoodie,
    colors: ["#D6C7FF", "#FFD54A", "#FF5A9E"],
    inStock: true,
  },
];

export default function Product() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#FFD54A");

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = [
    { hex: "#FFD54A", name: "Citrus Yellow" },
    { hex: "#FF5A9E", name: "Berry Magenta" },
    { hex: "#D6C7FF", name: "Lavender" },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted sticky top-24">
              <img
                src={yellowHoodie}
                alt="Citrus Glow Hoodie"
                className="w-full h-full object-cover"
                data-testid="img-product-main"
              />
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <Badge className="mb-3" data-testid="badge-new-arrival">New Arrival</Badge>
              <h1 className="text-4xl font-bold mb-2" data-testid="text-product-name">
                Citrus Glow Hoodie
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(42 reviews)</span>
              </div>
              <p className="text-3xl font-bold text-primary" data-testid="text-product-price">
                $89.00
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed" data-testid="text-product-description">
              Heavyweight comfort with a photogenic pop. 350gsm brushed fleece, reinforced seams, true-to-size. 
              Machine wash cold. Free returns. Each hoodie is designed to make you stand out with bold colors and premium quality.
            </p>

            <div className="space-y-4">
              <div>
                <p className="font-medium mb-3">Color: {colors.find((c) => c.hex === selectedColor)?.name}</p>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <motion.button
                      key={color.hex}
                      className={`w-12 h-12 rounded-full border-2 ${
                        selectedColor === color.hex ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColor(color.hex)}
                      whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                      data-testid={`button-color-${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="font-medium mb-3">Size: {selectedSize}</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      className="w-16"
                      data-testid={`button-size-${size.toLowerCase()}`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <Button
                size="lg"
                className="w-full gap-2"
                onClick={() => console.log("Added to cart:", { selectedSize, selectedColor })}
                data-testid="button-add-to-cart"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="w-full" data-testid="button-size-guide">
                View Size Guide
              </Button>
            </div>
          </motion.div>
        </div>

        <Tabs defaultValue="details" className="mb-16">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="details" data-testid="tab-details">Details</TabsTrigger>
            <TabsTrigger value="shipping" data-testid="tab-shipping">Shipping</TabsTrigger>
            <TabsTrigger value="reviews" data-testid="tab-reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4 pt-6">
            <div>
              <h3 className="font-semibold mb-2">Product Details</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 350gsm brushed fleece</li>
                <li>• Reinforced seams for durability</li>
                <li>• True-to-size fit</li>
                <li>• Machine wash cold, tumble dry low</li>
                <li>• Premium quality materials</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="space-y-4 pt-6">
            <div>
              <h3 className="font-semibold mb-2">Shipping Information</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Free shipping on orders over $50</li>
                <li>• Standard delivery: 5-7 business days</li>
                <li>• Express delivery available</li>
                <li>• 30-day return policy</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <div className="space-y-4">
              <p className="text-muted-foreground">42 customer reviews - Average rating: 5.0/5</p>
            </div>
          </TabsContent>
        </Tabs>

        <div>
          <h2 className="text-3xl font-bold mb-8" data-testid="text-related-title">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(p) => console.log("Add to cart:", p.name)}
                onClick={() => console.log("Product clicked:", product.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
