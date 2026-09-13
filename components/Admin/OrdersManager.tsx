type Props = {
  users: any[];
};

export default function OrderManager({ users }: Props) {
  return (
    <section className="w-full">

      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-5">
        مدیریت سفارشات
      </h2>


      <div
        className="
        space-y-5 
        max-h-[450px]
        md:max-h-[600px]
        overflow-y-auto 
        pr-1
        md:pr-2
        "
      >

        {users.map((user) => (

          <div
            key={user.id}
            className="
            rounded-2xl 
            border border-white/40 
            bg-white/70 
            backdrop-blur-xl 
            shadow-lg 
            p-4
            md:p-6
            "
          >


            {/* اطلاعات کاربر */}
            <div
              className="
              border-b 
              border-slate-200 
              pb-3 
              mb-4
              "
            >

              <h3 className="
                text-lg
                md:text-xl
                font-semibold 
                text-slate-800
                truncate
              ">
                {user.name}
              </h3>


              <p className="
                text-xs
                md:text-sm
                text-slate-500 
                mt-1
                break-all
              ">
                {user.email}
              </p>


            </div>




            {user.orders.length === 0 ? (

              <div
                className="
                rounded-xl 
                bg-slate-100 
                p-3
                md:p-4
                text-center 
                text-sm
                text-slate-500
                "
              >
                هیچ سفارشی ثبت نشده
              </div>


            ) : (

              <div className="space-y-4">


                {user.orders.map((order) => (

                  <div
                    key={order.id}
                    className="
                    rounded-xl 
                    border 
                    border-slate-200 
                    bg-slate-50 
                    p-3
                    md:p-4
                    "
                  >


                    {/* Order Header */}
                    <div
                      className="
                      flex 
                      flex-col
                      sm:flex-row
                      sm:justify-between
                      sm:items-center
                      gap-3
                      mb-3
                      "
                    >

                      <p
                        className="
                        font-semibold 
                        text-sm
                        md:text-base
                        text-slate-700
                        break-all
                        "
                      >
                        سفارش #{order.id.slice(0, 8)}
                      </p>


                      <span
                        className="
                        w-fit
                        rounded-full 
                        bg-sky-100 
                        text-sky-700 
                        px-3 
                        py-1 
                        text-xs
                        md:text-sm
                        "
                      >
                        {order.total.toLocaleString()} تومان
                      </span>


                    </div>




                    {/* Items */}
                    <div className="space-y-2">


                      {order.items.map((item) => (

                        <div
                          key={item.id}
                          className="
                          flex 
                          flex-col
                          xs:flex-row
                          sm:flex-row
                          sm:justify-between
                          gap-2
                          rounded-lg 
                          bg-white 
                          px-3 
                          py-2
                          text-sm
                          "
                        >

                          <span className="truncate">
                            {item.product.name}
                          </span>


                          <span className="text-slate-500">
                            × {item.quantity}
                          </span>


                        </div>


                      ))}


                    </div>


                  </div>


                ))}


              </div>

            )}


          </div>

        ))}


      </div>


    </section>
  );
}