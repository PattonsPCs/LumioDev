import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { allProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { getPriceBySize } from "@/lib/utils";
import SunBeams from "@/components/SunBeams";

export default function Shop() {
  const [, setLocation] = useLocation();
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [sortBy, setSortBy] = useState("featured");
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: { id: string; name: string; price: number; image: string }) => {
    // Default size is M, which costs $60
    const defaultPrice = getPriceBySize("M");
    addToCart({
      id: product.id,
      name: product.name,
      price: defaultPrice,
      image: product.image,
      size: "M",
      color: "Default",
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const colorFilters = [
    { label: "All Colors", value: "all", color: null },
    { label: "Golden Sun", value: "yellow", color: "#F0B429" },
    { label: "Coral Pink", value: "coral", color: "#F09B9B" },
    { label: "Sandy Beige", value: "sand", color: "#E8D5B7" },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    // Filter by color
    let filtered = allProducts.filter((product) => {
      if (selectedColor === "all") return true;
      const colorMap: Record<string, string> = {
        yellow: "#F0B429",
        coral: "#F09B9B",
        sand: "#E8D5B7",
      };
      return product.colors.includes(colorMap[selectedColor]);
    });

    // Sort products - use default price of $60 (size M) for all products
    const defaultPrice = getPriceBySize("M");
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return defaultPrice - defaultPrice; // All same price, so no change
        case "price-high":
          return defaultPrice - defaultPrice; // All same price, so no change
        case "newest":
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        case "featured":
        default:
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return a.id.localeCompare(b.id);
      }
    });

    return sorted;
  }, [selectedColor, sortBy]);

  return (
    <div className="min-h-screen relative">
      <SunBeams className="opacity-10" />
      <div className="bg-gradient-to-br from-accent/30 to-background py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-shop-title">
            Shop All Hoodies
          </h1>
          <p className="text-lg text-muted-foreground">
            {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? "product" : "products"} available
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <p className="text-sm font-medium mb-3">Filter by Color:</p>
            <div className="flex flex-wrap gap-2">
              {colorFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={selectedColor === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedColor(filter.value)}
                  className="gap-2"
                  data-testid={`button-filter-${filter.value}`}
                >
                  {filter.color && (
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: filter.color }}
                    />
                  )}
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="w-full md:w-48">
            <p className="text-sm font-medium mb-3">Sort by:</p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger data-testid="select-sort">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProducts.map((product) => {
            // Use default price of $60 (size M) for display
            const defaultPrice = getPriceBySize("M");
            const productWithDefaultPrice = {
              ...product,
              price: defaultPrice,
            };
            return (
              <ProductCard
                key={product.id}
                product={productWithDefaultPrice}
                onAddToCart={handleAddToCart}
                onClick={() => setLocation(`/product/${product.id}`)}
              />
            );
          })}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              No products found with the selected filters.
            </p>
            <Button onClick={() => setSelectedColor("all")} data-testid="button-clear-filters">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
