type Props = {
  users: any[]; // فعلاً موقت، بعداً تایپ دقیقش رو می‌نویسیم
};

export default function OrderManager({ users }: Props) {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        مدیریت سفارشات
      </h2>

      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-lg p-6"
          >
            {/* اطلاعات کاربر */}
            <div className="border-b border-slate-200 pb-4 mb-4">
              <h3 className="text-xl font-semibold text-slate-800">
                {user.name}
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                {user.email}
              </p>
            </div>

            {/* اگر سفارشی نداشت */}
            {user.orders.length === 0 ? (
              <div className="rounded-xl bg-slate-100 p-4 text-center text-slate-500">
                هیچ سفارشی ثبت نشده
              </div>
            ) : (
              <div className="space-y-4">
                {user.orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <p className="font-semibold text-slate-700">
                        سفارش #{order.id.slice(0, 8)}
                      </p>

                      <span className="rounded-full bg-sky-100 text-sky-700 px-3 py-1 text-sm">
                        {order.total} تومان
                      </span>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center rounded-lg bg-white px-3 py-2"
                        >
                          <span>{item.product.name}</span>

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