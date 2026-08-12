import Image from "next/image";
import Link from "next/link";
import { Product as PrismaProduct } from "@prisma/client";


interface ProductCardProps {
  product: PrismaProduct & {
    images: { id: string; url: string }[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  // گرفتن اولین عکس با شرط امنیتی که اگر خالی بود کرش نکند
  const firstImage = product.images?.[0];

// ۲. بررسی می‌کنیم: اگر خودش متن بود همان را استفاده کن، اگر آبجکت بود .url آن را بردار
const mainImage = typeof firstImage === 'string' 
  ? firstImage 
  : (firstImage as any)?.url || "/images/placeholder.jpg";

  return (
    <Link 
      href={`/product/${product.slug}`} 
      className="block bg-sky-100 backdrop-blur-3xl p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-right cursor-pointer"
    >
      {/* بخش عکس */}
      <div className="w-full h-70 relative mb-4 border border-stone-200 rounded-lg overflow-hidden">
        <Image 
          src={mainImage} 
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* بخش مشخصات */}
      <h2 className="text-lg font-semibold">{product.name}</h2> 
      <p className="text-gray-500 text-sm my-2 line-clamp-2">{product.features}</p>
      
      {/* بخش قیمت و وضعیت */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sky-500 font-bold">{product.price.toLocaleString()} تومان</span>
        
        {product.countInStock > 0 ? (
          <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">موجود در انبار</span>
        ) : (
          <span className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">ناموجود</span>
        )}
      </div>
    </Link>
  );
}