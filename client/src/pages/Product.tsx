import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";
import { ShoppingCart, Star } from "lucide-react";
import SunBeams from "@/components/SunBeams";
import { getProductById, getRelatedProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { getPriceBySize } from "@/lib/utils";
import NotFound from "./not-found";

export default function Product() {
  const shouldReduceMotion = useReducedMotion();
  const [, params] = useRoute("/product/:id");
  const [, setLocation] = useLocation();
  const productId = params?.id || "";
  const product = getProductById(productId);
  
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (product && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) {
    return <NotFound />;
  }

  const relatedProducts = getRelatedProducts(productId);

  const handleAddToCart = () => {
    const colorName = product.colors.findIndex((c) => c === selectedColor) >= 0
      ? `Color ${product.colors.indexOf(selectedColor) + 1}`
      : "Default";
    
    const price = getPriceBySize(selectedSize);
    
    addToCart({
      id: product.id,
      name: product.name,
      price: price,
      image: product.image,
      size: selectedSize,
      color: colorName,
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedSize}, ${colorName}) has been added to your cart.`,
    });
  };

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXXXL"];
  const colors = product.colors.map((hex, index) => ({
    hex,
    name: index === 0 ? "Golden Sun" : index === 1 ? "Coral Pink" : "Sandy Beige",
  }));

  return (
    <div className="min-h-screen relative">
      <SunBeams className="opacity-10" />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted sticky top-24">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
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
              {product.isNew && <Badge className="mb-3" data-testid="badge-new-arrival">New Arrival</Badge>}
              <h1 className="text-4xl font-bold mb-2" data-testid="text-product-name">
                {product.name}
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
                ${getPriceBySize(selectedSize)}.00
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed" data-testid="text-product-description">
              {product.description || "Heavyweight comfort with a photogenic pop. 350gsm brushed fleece, reinforced seams, true-to-size. Machine wash cold. Free returns."}
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
                onClick={handleAddToCart}
                disabled={!product.inStock}
                data-testid="button-add-to-cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
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
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                onAddToCart={(p) => {
                  addToCart({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    image: p.image,
                    size: "M",
                    color: "Default",
                  });
                  toast({
                    title: "Added to cart",
                    description: `${p.name} has been added to your cart.`,
                  });
                }}
                onClick={() => setLocation(`/product/${relatedProduct.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
