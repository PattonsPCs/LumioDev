import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  colors: string[];
  inStock: boolean;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onClick?: () => void;
}

export default function ProductCard({ product, onAddToCart, onClick }: ProductCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? {} : { y: -6 }}
      transition={{ duration: 0.3 }}
      data-testid={`card-product-${product.id}`}
    >
      <Card className="overflow-hidden group cursor-pointer hover-elevate" onClick={onClick}>
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-testid={`img-product-${product.id}`}
          />
          {product.isNew && (
            <Badge className="absolute top-3 left-3" data-testid={`badge-new-${product.id}`}>
              New
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="absolute top-3 left-3">
              Out of Stock
            </Badge>
          )}
        </div>

        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg" data-testid={`text-product-name-${product.id}`}>
              {product.name}
            </h3>
            <p className="text-2xl font-bold text-primary" data-testid={`text-product-price-${product.id}`}>
              ${product.price}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {product.colors.map((color, index) => (
              <motion.div
                key={index}
                className="w-6 h-6 rounded-full border-2 border-border cursor-pointer"
                style={{ backgroundColor: color }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.2, rotate: 15 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                data-testid={`color-swatch-${product.id}-${index}`}
              />
            ))}
          </div>

          <Button
            className="w-full gap-2"
            disabled={!product.inStock}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
