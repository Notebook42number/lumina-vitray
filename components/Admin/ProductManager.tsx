import { Product } from "@prisma/client";

type Props = {
  products: Product[];
  deleteItem: (formData: FormData) => Promise<void>;
  updateProduct: (formData: FormData) => Promise<void>;
};

export default function ProductManager({
  products,
  deleteItem,
  updateProduct,
}: Props) {
  return (
    <section className="w-full">

      <h2 className="mb-6 text-2xl sm:text-3xl font-bold text-slate-800">
        مدیریت محصولات
      </h2>


      <div className="space-y-5 md:space-y-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="
            rounded-3xl 
            border border-white/40 
            bg-white/70 
            backdrop-blur-xl 
            shadow-xl 
            p-4 
            sm:p-6
            "
          >


            {/* Header */}
            <div
              className="
              flex 
              flex-col 
              sm:flex-row
              sm:items-center 
              sm:justify-between 
              gap-4
              border-b 
              border-slate-200 
              pb-4 
              mb-5
              "
            >

              <div className="min-w-0">

                <h3 className="
                  text-lg 
                  sm:text-xl 
                  font-bold 
                  text-slate-800
                  truncate
                ">
                  {product.name}
                </h3>


                <p className="
                  text-slate-500 
                  text-xs 
                  sm:text-sm 
                  mt-1
                  break-all
                ">
                  شناسه: {product.id.slice(0, 8)}
                </p>


              </div>


              <span
                className="
                w-fit
                bg-sky-100 
                text-sky-700 
                px-4 
                py-2 
                rounded-full 
                font-semibold
                text-sm
                "
              >
                {product.price.toLocaleString()} تومان
              </span>


            </div>




            {/* فرم ویرایش */}
            <form
              action={updateProduct}
              className="
              grid 
              grid-cols-1 
              lg:grid-cols-3 
              gap-4
              "
            >

              <input
                type="hidden"
                name="id"
                value={product.id}
              />


              <input
                type="text"
                name="name"
                defaultValue={product.name}
                className="
                rounded-xl 
                border 
                border-slate-300 
                bg-white 
                px-4 
                py-3 
                text-sm
                outline-none 
                focus:ring-4 
                focus:ring-sky-300/40
                "
              />


              <input
                type="number"
                name="price"
                defaultValue={product.price}
                className="
                rounded-xl 
                border 
                border-slate-300 
                bg-white 
                px-4 
                py-3 
                text-sm
                outline-none 
                focus:ring-4 
                focus:ring-sky-300/40
                "
              />



              <button
                type="submit"
                className="
                rounded-xl 
                bg-sky-600 
                hover:bg-sky-700 
                text-white 
                py-3 
                text-sm
                transition
                "
              >
                ذخیره تغییرات
              </button>


            </form>




            {/* حذف */}
            <div className="
              mt-5 
              flex 
              justify-end
            ">

              <form action={deleteItem}>

                <input
                  type="hidden"
                  name="id"
                  value={product.id}
                />


                <button
                  type="submit"
                  className="
                  rounded-xl 
                  bg-red-500 
                  hover:bg-red-600 
                  text-white 
                  px-5 
                  py-3 
                  text-sm
                  transition
                  "
                >
                  حذف محصول
                </button>


              </form>

            </div>


          </div>

        ))}

      </div>


    </section>
  );
}