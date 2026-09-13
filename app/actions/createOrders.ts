"use server";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function createOrder(
  items: { productId: string; quantity: number }[]
) {
  const productIds = items.map((item) => item.productId);

const session = await getServerSession(authOptions)

if (!session) {
  redirect("/login")
}
  const userId = session.user.id;


  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const total = items.reduce((sum, item) => {

    // پیدا کردن Product مربوط به همین item
    const product = products.find(
      (product) => product.id === item.productId
    );

    if (!product) {
      throw new Error("Product not found");
    }

   if(product.countInStock < item.quantity){
      throw new Error("موجودی این محصول در انبار کافی نیست")
   }
    // قیمت واقعی DB × تعداد موجود در Cart
    return sum + product.price * item.quantity;

  }, 0);

  const order = await prisma.order.create({
    data: {
      total,
      userId,
    },
  });


  const orderItems = items.map((item) => {

    // Product واقعی مربوط به این item را پیدا می‌کنیم
    const product = products.find(
      (product) => product.id === item.productId
    );

    if (!product) {
      throw new Error("Product not found");
    }

    return {
      productId: item.productId,
      quantity: item.quantity,
      price: product.price,
      orderId: order.id,
    };
  });

  await prisma.orderItem.createMany({
    data: orderItems,
  });


  // در نهایت می‌توانیم Order ساخته‌شده را برگردانیم
  return {
    orderId: order.id
  };
  
  }