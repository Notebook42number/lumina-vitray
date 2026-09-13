
import prisma from "@/lib/prisma"
import PaymentButton from "./PaymentButton"

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ authority: string }>
}) {
  const { authority } = await params

  // پیدا کردن Payment با authority
  const payment = await prisma.payment.findUnique({
    where: {
      authority: authority,
    },                                     
  })

  // اگر Payment پیدا نشد
  if (!payment) {
    return <div>Payment not found</div>
  }

  // پیدا کردن Order مربوط به این Payment
  const order = await prisma.order.findUnique({
    where: {
      id: payment.orderId,
    },
  })

  // اگر Order پیدا نشد
  if (!order) {
    return <div>Order not found</div>
  }



return (
  <div
    dir="rtl"
    className="min-h-screen bg-[#eef6ff] px-4 pb-16 pt-28"
  >
    <div className="mx-auto max-w-xl">

      {/* Header */}
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-medium text-primary-ink/60">
          Lumina Vitray
        </p>

        <h1 className="text-3xl font-bold text-primary-ink">
          پرداخت سفارش
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          اطلاعات پرداخت سفارش خود را بررسی کنید.
        </p>
      </div>

      {/* Payment Card */}
      <div className="rounded-[2rem] border border-white/60 bg-white/55 p-6 shadow-2xl backdrop-blur-2xl md:p-8">

        {/* Payment Info */}
        <div className="space-y-4">

          <div className="rounded-2xl bg-white/60 p-4">
            <p className="mb-1 text-xs text-neutral-500">
              شماره پرداخت
            </p>

            <p className="break-all text-sm font-medium text-primary-ink">
              {payment.authority}
            </p>
          </div>

          <div className="rounded-2xl bg-white/60 p-4">
            <p className="mb-1 text-xs text-neutral-500">
              شماره سفارش
            </p>

            <p className="text-sm font-medium text-primary-ink">
              {order.id}
            </p>
          </div>

          <div className="rounded-2xl bg-primary/10 p-5">
            <p className="mb-1 text-sm text-neutral-500">
              مبلغ قابل پرداخت
            </p>

            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-primary-ink">
                {order.total.toLocaleString()}
              </span>

              <span className="pb-1 text-sm text-neutral-500">
                تومان
              </span>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="my-7 h-px bg-primary/10" />

        {/* Payment Button */}
        <div>
          <PaymentButton authority={payment.authority} />
        </div>

      </div>
    </div>
  </div>
)
  }