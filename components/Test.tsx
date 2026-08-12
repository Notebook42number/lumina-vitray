export default function Test() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF6F0]">

      {/* === Background Layer (زیر شیشه) === */}
      <div className="absolute inset-0 z-0">
        {/* گرادیان نور قرمز-طلایی */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/30 via-amber-500/10 to-transparent" />
        
        {/* نور ملایم دایره‌ای (Lumina effect) */}
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      {/* === Glass Container اصلی === */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="glass w-full max-w-4xl mx-auto p-12 md:p-16">
          
          {/* محتوای اصلی سایت */}
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold text-neutral-900 mb-4">
              Lumina Vitray
            </h1>
            <p className="text-xl text-neutral-700 mb-8">
              هنر، طبیعت، و نور در کنار هم
            </p>
            
            {/* لوگو آهو (موقت) */}
            <div className="my-12 flex justify-center">
              {/* اینجا لوگوی آهو رو بعداً می‌ذاری */}
              <div className="text-8xl">🦌</div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}