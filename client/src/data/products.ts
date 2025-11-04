import yellowHoodie from "@assets/IMG_9431_1761942244389.png";
import sandHoodie from "@assets/IMG_9362_1761942225345.png";
import coralHoodie from "@assets/IMG_9432_1761942244391.png";
import { Product } from "@/components/ProductCard";

export const allProducts: Product[] = [
  {
    id: "1",
    name: "Sunshine Hoodie",
    price: 89,
    image: yellowHoodie,
    colors: ["#F0B429", "#F09B9B", "#E8D5B7"],
    inStock: true,
    isNew: true,
    description: "Heavyweight comfort with a photogenic pop. 350gsm brushed fleece, reinforced seams, true-to-size. Machine wash cold. Free returns. Each hoodie is designed to make you stand out with bold colors and premium quality.",
  },
  {
    id: "2",
    name: "Coral Breeze Hoodie",
    price: 89,
    image: coralHoodie,
    colors: ["#F09B9B", "#F0B429", "#E8D5B7"],
    inStock: true,
    isNew: true,
    description: "Heavyweight comfort with a photogenic pop. 350gsm brushed fleece, reinforced seams, true-to-size. Machine wash cold. Free returns.",
  },
  {
    id: "3",
    name: "Sandy Beach Hoodie",
    price: 89,
    image: sandHoodie,
    colors: ["#E8D5B7", "#F0B429", "#F09B9B"],
    inStock: true,
    description: "Heavyweight comfort with a photogenic pop. 350gsm brushed fleece, reinforced seams, true-to-size. Machine wash cold. Free returns.",
  },
  {
    id: "4",
    name: "Golden Hour Hoodie",
    price: 95,
    image: yellowHoodie,
    colors: ["#F0B429"],
    inStock: true,
    description: "Premium streetwear hoodie with bold golden color. 350gsm brushed fleece, reinforced seams, true-to-size.",
  },
  {
    id: "5",
    name: "Sunset Coral Hoodie",
    price: 95,
    image: coralHoodie,
    colors: ["#F09B9B"],
    inStock: false,
    description: "Vibrant coral hoodie with premium quality. 350gsm brushed fleece, reinforced seams, true-to-size.",
  },
  {
    id: "6",
    name: "Island Sand Hoodie",
    price: 95,
    image: sandHoodie,
    colors: ["#E8D5B7"],
    inStock: true,
    description: "Elegant sandy beige hoodie. 350gsm brushed fleece, reinforced seams, true-to-size.",
  },
];

export const featuredProducts = allProducts.filter((p) => p.isNew || p.id === "3");

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getRelatedProducts(currentId: string, limit: number = 3): Product[] {
  return allProducts.filter((p) => p.id !== currentId && p.inStock).slice(0, limit);
}

