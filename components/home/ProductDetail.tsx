'use client'
import { useCartStore } from "@/lib/cart-store";
import Image from "next/image";
import toast from "react-hot-toast"
type ProductDetailProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    features: string;
    category: string;
    countInStock: number;
    images: {
      id: string;
      url: string;
    }[];
  };
};

export default function ProductDetail({
  product,
}: ProductDetailProps) {

  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <section
      className="container mx-auto px-6 py-10"
      dir="rtl"
    >
      <div className="backdrop-blur-2xl bg-white/20 bord flex flex-col-reverse gap-10 md:flex-row-reverse">
        {/* اطلاعات محصول */}
        <div className="flex-1">
          <p className="mb-2 text-sm text-gray-500">
            {product.category}
          </p>

          <h1 className="mb-4 text-4xl font-bold">
            {product.name}
          </h1>

          <p className="mb-6 text-2xl font-semibold text-emerald-600">
            {product.price.toLocaleString()} تومان
          </p>

          <p className="mb-6 leading-8 text-gray-700">
            {product.features}
          </p>

          <div className="mb-8">
            {product.countInStock > 0 ? (
              <span className="rounded bg-green-100 px-3 py-1 text-green-700">
                موجود
              </span>
            ) : (
              <span className="rounded bg-red-100 px-3 py-1 text-red-700">
                ناموجود
              </span>
            )}
          </div>
<button onClick={() => {
  addToCart({
    productId: product.id,
    name: product.name,
    price: product.price,
    image:"",
  })
     toast.success(`${product.name} به سبد خرید اضافه شد`)
}}>
  افزودن به سبد خرید
</button>
        </div>

        {/* تصویر محصول */}
        <div className="relative h-[500px] flex-1 overflow-hidden rounded-xl border">
          <Image
            src={product.images[0]?.url ?? "/images/placeholder.jpg"}
            alt={product.name}
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}