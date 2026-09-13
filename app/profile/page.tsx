import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
export default async function Profile() {



  const session = await getServerSession(authOptions)

  if (!session) {
    return <div>Login required</div>
  }


  const user = await prisma.user.findUnique({
    
  
    where: {
      id: session.user.id
    },

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

  })


if (!user){
  return(
    <div>کاربر پیدا نشد</div>
  )
}

return (
  <div
    dir="rtl"
    className="min-h-screen bg-gradient-to-br from-amber-100 to-rose-100 px-4 py-6 sm:px-6"
  >

    <div
      className="
      mx-auto 
      max-w-3xl 
      rounded-3xl 
      border 
      border-white/40 
      bg-white/70 
      p-5 
      shadow-xl 
      backdrop-blur-xl
      sm:p-8
      "
    >


      {/* User Info */}
      <div className="mb-8 text-center">

        <h1 className="
          text-2xl 
          font-bold 
          text-rose-700
          sm:text-3xl
        ">
          {user.name}
        </h1>


        <p className="
          mt-2 
          break-all
          text-sm 
          text-gray-600
          sm:text-base
        ">
          {user.email}
        </p>


        <div
          className="
          mt-4 
          inline-flex 
          rounded-full 
          bg-rose-100 
          px-5 
          py-2 
          text-sm 
          text-rose-700
          sm:text-base
          "
        >
          {user.orders.length} سفارش ثبت شده
        </div>

      </div>



      {/* Orders */}

      <div className="space-y-5">


        {user.orders.map(order => (

          <div
            key={order.id}
            className="
            rounded-2xl 
            border 
            border-rose-100 
            bg-white 
            p-4 
            shadow-md
            sm:p-6
            "
          >


            {/* Order Header */}

            <div
              className="
              mb-4 
              flex 
              flex-col 
              gap-3
              sm:flex-row 
              sm:items-center 
              sm:justify-between
              "
            >

              <div className="min-w-0">

                <p className="text-sm text-gray-500">
                  شماره سفارش
                </p>


                <p
                  className="
                  break-all
                  text-sm
                  font-semibold
                  sm:text-base
                  "
                >
                  {order.id}
                </p>

              </div>


              <span
                className="
                w-fit
                rounded-full 
                bg-green-100 
                px-4 
                py-1 
                text-sm 
                text-green-700
                "
              >
                {order.status}
              </span>


            </div>



            {/* Total */}

            <div
              className="
              mb-5 
              rounded-xl 
              bg-amber-50 
              p-3
              "
            >

              <p className="text-sm text-amber-800 sm:text-base">

                مبلغ کل:

                <span className="mr-2 font-bold">

                  {order.total.toLocaleString()} تومان

                </span>

              </p>

            </div>




            <h3
              className="
              mb-3 
              font-bold 
              text-rose-700
              "
            >
              محصولات
            </h3>



            <div className="space-y-3">


              {order.items.map(item => (

                <div
                  key={item.id}
                  className="
                  flex
                  flex-col
                  gap-3
                  rounded-xl 
                  bg-rose-50 
                  p-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  "
                >


                  <div>

                    <p className="font-semibold text-gray-800">
                      {item.product.name}
                    </p>


                    <p className="mt-1 text-sm text-gray-600">
                      تعداد: {item.quantity}
                    </p>

                  </div>



                  <p
                    className="
                    font-bold 
                    text-rose-700
                    "
                  >
                    {item.price.toLocaleString()} تومان
                  </p>


                </div>

              ))}


            </div>


          </div>

        ))}


      </div>


    </div>


  </div>
)

}
