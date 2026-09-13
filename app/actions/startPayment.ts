"use server"

import prisma from "@/lib/prisma"


export async function startPayment(orderId:string){
  
const order = await prisma.order.findUnique({
  where:{
    id: orderId
  },
})
if (!order){
  throw new Error ("order not found")
}
if(order.status !=="PENDING"){
  throw new Error ("order is not payable")
}
const authority =Math.random().toString(36).slice(2)

const payment = await prisma.payment.create({
  data: {
    orderId: order.id,
    authority: authority,
  },
})
return {
  authority
}
}

