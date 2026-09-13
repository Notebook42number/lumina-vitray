"use server"

import prisma from "@/lib/prisma"


export async function verifyPayment(authority: string) {


  // 1. پیدا کردن Payment
  const payment = await prisma.payment.findUnique({

    where: {
      authority: authority,
    },

  })


  if (!payment) {
    throw new Error("Payment not found")
  }



  // 2. پیدا کردن Order همراه با آیتم‌هایش
  const order = await prisma.order.findUnique({

    where: {
      id: payment.orderId,
    },

    include: {

      items: true

    }

  })


  if (!order) {
    throw new Error("Order not found")
  }



  // 3. بررسی اینکه قبلاً پرداخت نشده باشد
  if (order.status !== "PENDING") {

    throw new Error("Order is not payable")

  }



  // 4. شبیه سازی پرداخت موفق
  const paymentSuccessful = true



  if (!paymentSuccessful) {


    await prisma.order.update({

      where: {
        id: order.id
      },

      data: {

        status: "FAILED"

      }

    })


    return {
      success: false
    }

  }



  // 5. تغییر وضعیت سفارش به پرداخت شده
  await prisma.order.update({

    where: {

      id: order.id

    },

    data: {

      status: "PAID"

    }

  })




  // 6. کم کردن موجودی محصولات
  for (const item of order.items) {


    await prisma.product.update({

      where: {

        id: item.productId

      },

      data: {

        countInStock: {

          decrement: item.quantity

        }

      }

    })

  }





  return {

    success: true,

    orderId: order.id

  }


}