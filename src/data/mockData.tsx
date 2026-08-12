export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  features: string;
  category: string;
  countInStock: number;
}

export const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "قاب ونگوگ",
    slug: "vangogh",
    price: 250000,
    images: ["/images/product1.jpg"], // چک کن که در پوشه public اسم فایل همین باشه
    features: "پرتره هنری زیبا از ونگوگ",
    category: "هنر",
    countInStock: 2
  },
  {
    id: "prod-2",
    name: "هری پاتر ۱",
    slug: "lol",
    price: 380000,
    images: ["/images/product2.jpg"],
    features: "برای عاشقان هری پاتر",
    category: "هنر",
    countInStock: 2
  },
  {
    id: "prod-3",
    name: "هری پاتر ۲",
    slug: "harry-potter-2",
    price: 380000,
    images: ["/images/product3.jpg"],
    features: "برای عاشقان هری پاتر",
    category: "هنر",
    countInStock: 2
  },
  {
    id: "prod-4",
    name: "هری پاتر ۳",
    slug: "harry-potter-3",
    price: 380000,
    images: ["/images/product1.jpg"], // این رو از محصول ۱ قرض گرفته
    features: "برای عاشقان هری پاتر",
    category: "هنر",
    countInStock: 2
  },
  {
    id: "prod-5",
    name: "هری پاتر ۴",
    slug: "harry-potter-4",
    price: 380000,
    images: ["/images/product4.jpg"],
    features: "برای عاشقان هری پاتر",
    category: "هنر",
    countInStock: 2
  },
  {
    id: "prod-6",
    name: "هری پاتر ۵",
    slug: "harry-potter-5",
    price: 380000,
    images: ["/images/product3.jpg"],
    features: "برای عاشقان هری پاتر",
    category: "هنر",
    countInStock: 2
  },
  {
    id: "prod-7",
    name: "هری پاتر ۶",
    slug: "harry-potter-6",
    price: 380000,
    images: ["/images/product5.jpg"],
    features: "برای عاشقان هری پاتر",
    category: "هنر",
    countInStock: 2
  }
];