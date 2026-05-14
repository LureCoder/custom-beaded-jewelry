export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  imageBlur?: string;
  category: string;
  material: string[];
  orderCount: number;
  slug: string;
}

export interface CustomizeStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface Material {
  id: string;
  name: string;
  description: string;
  image: string;
  category: "wood" | "crystal" | "agate" | "bodhi" | "other";
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  customization?: Record<string, string>;
}
