export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center p-6">
      
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl p-8 border border-white/40">
        
        <h2 className="text-3xl font-bold text-rose-700 mb-6 text-center">
          پروفایل 
        </h2>

        <div className="space-y-4 text-rose-900">
          <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
            <p className="text-sm text-rose-600">نام کاربری</p>
            <p className="text-lg font-semibold">pari</p>
          </div>

          <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
            <p className="text-sm text-rose-600">ایمیل</p>
            <p className="text-lg font-semibold">example@gmail.com</p>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
            <p className="text-sm text-amber-600">سفارشات</p>
            <p className="text-lg font-semibold">0 سفارش ثبت شده</p>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
            <p className="text-sm text-amber-600">محصولات خریداری‌شده</p>
            <p className="text-lg font-semibold">—</p>
          </div>
        </div>

      </div>
    </div>
  );
}
