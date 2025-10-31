import { useState } from "react";
import { useLocation } from "wouter";
import ProductCard, { type Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import yellowHoodie from "@assets/IMG_9431_1761942244389.png";
import sandHoodie from "@assets/IMG_9362_1761942225345.png";
import coralHoodie from "@assets/IMG_9432_1761942244391.png";
import SunBeams from "@/components/SunBeams";

const allProducts: Product[] = [
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
  {
    id: "4",
    name: "Golden Hour Hoodie",
    price: 95,
    image: yellowHoodie,
    colors: ["#F0B429"],
    inStock: true,
  },
  {
    id: "5",
    name: "Sunset Coral Hoodie",
    price: 95,
    image: coralHoodie,
    colors: ["#F09B9B"],
    inStock: false,
  },
  {
    id: "6",
    name: "Island Sand Hoodie",
    price: 95,
    image: sandHoodie,
    colors: ["#E8D5B7"],
    inStock: true,
  },
];

export default function Shop() {
  const [, setLocation] = useLocation();
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [sortBy, setSortBy] = useState("featured");

  const colorFilters = [
    { label: "All Colors", value: "all", color: null },
    { label: "Golden Sun", value: "yellow", color: "#F0B429" },
    { label: "Coral Pink", value: "coral", color: "#F09B9B" },
    { label: "Sandy Beige", value: "sand", color: "#E8D5B7" },
  ];

  const filteredProducts = allProducts.filter((product) => {
    if (selectedColor === "all") return true;
    const colorMap: Record<string, string> = {
      yellow: "#F0B429",
      coral: "#F09B9B",
      sand: "#E8D5B7",
    };
    return product.colors.includes(colorMap[selectedColor]);
  });

  return (
    <div className="min-h-screen relative">
      <SunBeams className="opacity-10" />
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
