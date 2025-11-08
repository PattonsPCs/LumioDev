export interface ProductDefinition {
  id: string;
  name: string;
  price: number;
}

const productCatalog: Record<string, ProductDefinition> = {
  "1": {
    id: "1",
    name: "Sunshine Hoodie",
    price: 89,
  },
  "2": {
    id: "2",
    name: "Coral Breeze Hoodie",
    price: 89,
  },
  "3": {
    id: "3",
    name: "Sandy Beach Hoodie",
    price: 89,
  },
  "4": {
    id: "4",
    name: "Golden Hour Hoodie",
    price: 95,
  },
  "5": {
    id: "5",
    name: "Sunset Coral Hoodie",
    price: 95,
  },
  "6": {
    id: "6",
    name: "Island Sand Hoodie",
    price: 95,
  },
};

export function getProductById(id: string): ProductDefinition | undefined {
  return productCatalog[id];
}

export function getProductsByIds(ids: string[]): ProductDefinition[] {
  return ids
    .map((id) => productCatalog[id])
    .filter((product): product is ProductDefinition => Boolean(product));
}

