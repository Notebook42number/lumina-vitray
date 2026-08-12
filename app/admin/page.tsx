// app/admin/page.tsx
import OrderManager from "@/components/Admin/OrdersManager";
import PictureManager from "@/components/Admin/PictureManager";
import { prisma } from "@/lib/prisma"; // اصلاح نام ایمپورت
import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import ProductManager from "@/components/Admin/ProductManager";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";




export default async function AdminPage() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if ((session.user as any).role !== "ADMIN") {
    redirect("/");}

  const users = await prisma.user.findMany({
  include: {
    orders: {
      include: {
        items: {
          include: {      
            product: true
          }
        }
      }
    }
  }
});

const products=await prisma.product.findMany();

async function uploadImage(formData: FormData) {
  "use server";

  const image = formData.get("image") as File;

  if (!image || image.size === 0) {
    throw new Error("فایلی انتخاب نشده");
  }


  const bytes = await image.arrayBuffer();

  const buffer = Buffer.from(bytes);


  const fileName = `${Date.now()}-${image.name}`;


  const filePath = path.join(
    process.cwd(),
    "public",
    "uploads",
    fileName
  );


  await fs.writeFile(filePath, buffer);


  const productId = formData.get("productId") as string;


  await prisma.productImage.create({
    data:{
      url:`/uploads/${fileName}`,
      productId
    }
  });




  
}

  async function createProduct(formData: FormData) {
    "use server";
    
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    
    // ساخت یک اسلاگ ساده بر اساس نام محصول برای اینکه ارور یکتا بودن نگیریم
    const slug = name.toLowerCase().replace(/ /g, "-") + "-" + Date.now();

    await prisma.product.create({
      data: {
        name: name,
        slug: slug,
        price: Number(price),
        category: "دستی", // فیلدهای اجباری اسکیما رو اینجا پر می‌کنیم
        features: "ویژگی‌های پیش‌فرض",
        countInStock: 10,
      }
    });

    redirect("/");

  }

  async function updateProduct(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));

  await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      price,
    },
  });
}
async function deleteItem (formdata:FormData) {
  "use server"
  const id = formdata.get("id") as string;


  await prisma.product.delete({
    where :{
      id,
    },
  });redirect("/admin");
}




  
  return (
  <main
    dir="rtl"
    className="min-h-screen relative overflow-hidden bg-[#eef6ff]"
  >
    {/* Background */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-sky-300/30 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-blue-400/20 blur-[120px]" />

      <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/20 blur-[170px]" />
    </div>

    <div className="max-w-7xl mx-auto px-5 md:px-8 py-12">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-sky-900">
          پنل مدیریت Lumina
        </h1>

        <p className="mt-2 text-slate-500">
          مدیریت محصولات، تصاویر و سفارشات
        </p>
      </div>

      {/* Top Cards */}
      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-8
        items-start
      "
      >

        {/* Create Product */}

        <div
          className="
          rounded-3xl
          bg-white/50
          backdrop-blur-2xl
          border
          border-white/40
          shadow-xl
          p-8
        "
        >
          <form action={createProduct} className="space-y-5">

            <h2 className="text-2xl font-bold text-sky-900">
              افزودن محصول
            </h2>

            <input
              type="text"
              name="name"
              placeholder="نام محصول"
              required
              className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white/70
              px-4
              py-3
              outline-none
              focus:ring-4
              focus:ring-sky-300/40
            "
            />

            <input
              type="number"
              name="price"
              placeholder="قیمت"
              required
              className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white/70
              px-4
              py-3
              outline-none
              focus:ring-4
              focus:ring-sky-300/40
            "
            />

            <button
              className="
              w-full
              rounded-xl
              bg-sky-600
              hover:bg-sky-700
              text-white
              py-3
              transition
            "
            >
              ذخیره محصول
            </button>

          </form>
        </div>

        {/* Upload */}

        <div
          className="
          rounded-3xl
          bg-white/50
          backdrop-blur-2xl
          border
          border-white/40
          shadow-xl
          p-8
        "
        >
          <PictureManager
            products={products}
            uploadImage={uploadImage}
          />
        </div>

        {/* Orders */}

        <div
          className="
          rounded-3xl
          bg-white/50
          backdrop-blur-2xl
          border
          border-white/40
          shadow-xl
          p-8
          max-h-[600px]
          overflow-y-auto
        "
        >
          <OrderManager users={users} />
        </div>

      </div>

      {/* Product Manager */}

      <div
        className="
        mt-10
        rounded-3xl
        bg-white/50
        backdrop-blur-2xl
        border
        border-white/40
        shadow-xl
        p-8
      "
      >
        <ProductManager
          products={products}
          deleteItem={deleteItem}
          updateProduct={updateProduct}
        />
      </div>

    </div>
  </main>
);  }