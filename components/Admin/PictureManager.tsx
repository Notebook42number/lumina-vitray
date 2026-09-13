import { Product } from "@prisma/client"


type Props = {
  uploadImage: (formData: FormData) => Promise<void>;
  products: Product[];
};


export default function PictureManager({
  uploadImage,
  products
}: Props) {

  return (
    <section
      className="
      w-full
      p-4
      sm:p-6
      rounded-3xl
      bg-white/70
      backdrop-blur-xl
      border
      border-white/40
      "
    >

      <h2
        className="
        text-2xl
        sm:text-3xl
        font-bold
        text-slate-800
        mb-6
        "
      >
        آپلود عکس
      </h2>


      <form
        action={uploadImage}
        className="
        flex
        flex-col
        gap-4
        "
      >


        <input
          type="file"
          name="image"
          accept="image/*"
          className="
          w-full
          rounded-xl
          border
          border-slate-300
          p-3
          bg-white
          text-sm
          "
        />



        <select
          name="productId"
          className="
          w-full
          rounded-xl
          border
          border-slate-300
          p-3
          bg-white
          text-sm
          "
        >

          {products.map((product) => (

            <option
              key={product.id}
              value={product.id}
            >
              {product.name}
            </option>

          ))}

        </select>



        <button
          type="submit"
          className="
          w-full
          rounded-xl
          bg-sky-600
          hover:bg-sky-700
          transition
          text-white
          py-3
          font-semibold
          "
        >
          آپلود
        </button>


      </form>


    </section>
  );
}