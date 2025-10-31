import { useState } from "react";
import { useLocation } from "wouter";
import ProductCard, { type Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import yellowHoodie from "@assets/generated_images/Yellow_hoodie_product_photo_259447ce.png";
import magentaHoodie from "@assets/generated_images/Magenta_hoodie_product_photo_9165875a.png";
import lavenderHoodie from "@assets/generated_images/Lavender_hoodie_product_photo_12aea468.png";

const allProducts: Product[] = [
  {
    id: "1",
    name: "Citrus Glow Hoodie",
    price: 89,
    image: yellowHoodie,
    colors: ["#FFD54A", "#FF5A9E", "#D6C7FF"],
    inStock: true,
    isNew: true,
  },
  {
    id: "2",
    name: "Berry Burst Hoodie",
    price: 89,
    image: magentaHoodie,
    colors: ["#FF5A9E", "#FFD54A", "#D6C7FF"],
    inStock: true,
    isNew: true,
  },
  {
    id: "3",
    name: "Lavender Dream Hoodie",
    price: 89,
    image: lavenderHoodie,
    colors: ["#D6C7FF", "#FFD54A", "#FF5A9E"],
    inStock: true,
  },
  {
    id: "4",
    name: "Sunset Edition Hoodie",
    price: 95,
    image: yellowHoodie,
    colors: ["#FFD54A"],
    inStock: true,
  },
  {
    id: "5",
    name: "Midnight Berry Hoodie",
    price: 95,
    image: magentaHoodie,
    colors: ["#FF5A9E"],
    inStock: false,
  },
  {
    id: "6",
    name: "Twilight Lavender Hoodie",
    price: 95,
    image: lavenderHoodie,
    colors: ["#D6C7FF"],
    inStock: true,
  },
];

export default function Shop() {
  const [, setLocation] = useLocation();
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [sortBy, setSortBy] = useState("featured");

  const colorFilters = [
    { label: "All Colors", value: "all", color: null },
    { label: "Citrus Yellow", value: "yellow", color: "#FFD54A" },
    { label: "Berry Magenta", value: "magenta", color: "#FF5A9E" },
    { label: "Lavender", value: "lavender", color: "#D6C7FF" },
  ];

  const filteredProducts = allProducts.filter((product) => {
    if (selectedColor === "all") return true;
    const colorMap: Record<string, string> = {
      yellow: "#FFD54A",
      magenta: "#FF5A9E",
      lavender: "#D6C7FF",
    };
    return product.colors.includes(colorMap[selectedColor]);
  });

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-accent/30 to-background py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-shop-title">
            Shop All Hoodies
          </h1>
          <p className="text-lg text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} available
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
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(p) => console.log("Add to cart:", p.name)}
              onClick={() => setLocation(`/product/${product.id}`)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
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
