import Navbar from "@/components/layout/Navbar";
import { prisma } from "@/lib/prisma";
import Slider from "@/components/home/Slider";
import ProductSlider from "@/components/home/ProductSwiper";
import ProductCard from "@/components/home/ProductCard";
import FloatingItem from "@/components/motions/FloatingItem";
import Input from "@/components/home/Input";
import Link from "next/link";
import Gallery from "@/components/home/Gallery";


type HomeProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {

  const { search } = await searchParams;

const products=await prisma.product.findMany({
   where: search
    ? {
        name: {
          contains: search,
        
        },
      }
    : {},
  include:{images:true},
  orderBy : {createdAt:"desc"},
});








  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#FAF6F0] text-right pb-16" dir="rtl">
      
      {/* ۱. منوی اصلی در بالاترین لایه قرار می‌گیرد */}
      <Navbar />

      {/* === Background Layer (زیر شیشه) === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* گرادیان نور قرمز-طلایی */}
        
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-sky-400/10 to-transparent" />
        {/* نور ملایم دایره‌ای (Lumina effect) */}
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute top-10 right-10 bg-sky-100/40 h-[400px] w-[400px] blur-3xl rounded-full" />
      </div>

      {/* === محتوای اصلی سایت روی لایه z-10 === */}
      {/* اضافه کردن mt-28 برای اینکه محتوا زیر ناف‌بار fixed قایم نشود */}
      <div className="relative z-10 w-full max-w-[95%] mx-auto px-4 mt-28 flex flex-col gap-12">
        
        {/* بخش هدر و معرفی برند با افکت شیشه‌ای ظریف */}
        <div className="glass w-full rounded-3xl p-8 md:p-12 text-center shadow-sm border border-white/20">
          <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 mb-4 tracking-wide">
            Lumina Vitray
          </h1>
          <p className="text-lg text-neutral-600">
            تلالو نور و رنگ روی شیشه‌های دست‌ساز
          </p>
          <Input />
            
          
          {search && (
  <div className="w-[700px] mx-auto mt-2 rounded-xl overflow-hidden shadow-lg">
    {products.map((product) => (
      <Link
        key={product.id}
        href={`/product/${product.slug}`}
        className="block h-[50px] px-4 py-3 bg-sky-600 border-b border-sky-200 hover:bg-blue-300 hover:text-white"
      >
        {product.name}
      </Link>
    ))}
  </div>
)}
          
          <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* توپ اول: بالا سمت چپ - رنگ طلایی، حرکت نرم (شدت ۲۰) */}
        <div className="absolute top-8 left-12">
          <FloatingItem intensity={60}>
            <div className="bg-sky-400 h-14 w-14 rounded-full blur-xl opacity-60" />
          </FloatingItem>
        </div>

        {/* توپ دوم: پایین سمت راست - رنگ صورتی، حرکت سریع‌تر (شدت ۴5) */}
        <div className="absolute bottom-10 right-16">
          <FloatingItem intensity={85}>
            <div className="bg-sky-500 h-24 w-24 rounded-full blur-2xl opacity-50" />
          </FloatingItem>
        </div>

        {/* توپ سوم: وسط صفحه کمی متمایل به بالا - رنگ ارغوانی، سایز کوچک و تیزتر */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
          <FloatingItem intensity={90}>
            <div className="bg-purple-500 h-8 w-8 rounded-full blur-md opacity-70" />
          </FloatingItem>
        </div>

        {/* توپ چهارم: پایین سمت چپ - یک هاله بزرگ طلایی بسیار ملایم */}
        <div className="absolute bottom-6 left-1/4">
          <FloatingItem intensity={15}>
            <div className="bg-sky-200 h-32 w-32 rounded-full blur-3xl opacity-30" />
          </FloatingItem>
        </div>

      </div>
        </div>

        {/* اسلایدر بزرگ بنرها */}
        <Slider />

        {/* اسلایدر افقی محصولات ویژه (Swiper) */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-neutral-800 mr-2">محصولات ویژه</h2>
        
      <ProductSlider products={products} />
        </div>

        {/* بخش گرید ثابت تمام محصولات */}
        <div>



          <h2 className="text-2xl font-bold mb-6 text-neutral-800 mr-2">همه محصولات فروشگاه</h2>
          {/* تغییر به gap-8 و grid-cols-4 برای نمایش عریض‌تر و بازتر */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
          </div>
           
           <Gallery />

        </div>

      </div>

      {/* المان شناور تزئینی */}
    
    </main>
  );
}