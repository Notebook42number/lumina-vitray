import prisma from "@/lib/prisma"

export default async function PaymentSuccessPage({
  params,
}: {
  params: Promise<{
    orderId: string
  }>
}) {

  const { orderId } = await params


  const order = await prisma.order.findUnique({
    where:{
      id: orderId
    }
  })


  if(!order){
    return (
      <div>
        سفارش پیدا نشد
      </div>
    )
  }


  return (
    <div
      dir="rtl"
      className="flex min-h-screen flex-col items-center justify-center gap-4"
    >

      <h1 className="text-3xl font-bold text-green-600">
        پرداخت با موفقیت انجام شد 🎉
      </h1>


      <p>
        شماره سفارش:
        {" "}
        {order.id}
      </p>


      <p>
        مبلغ پرداختی:
        {" "}
        {order.total}
      </p>


    </div>
  )
}