import {Product} from "@prisma/client"


type Props = {
  uploadImage: (formData: FormData) => Promise<void>;
  products:Product[];
};


export default function PictureManager({uploadImage , products}:Props) {
  return (
    <section className="p-6 h-full max-h-screen w-[400px] bg-sky-400">
      <h2 className="text-3xl font-bold text-slate-800 mb-8">آپلود عکس</h2>

      <form action={uploadImage}
      className="flex flex-col gap-5"
      
      >
        <input type="file" name="image" accept="image/*"  className="rounded-xl border border-slate-300 p-3 bg-white" />

      <select className="rounded-xl border border-slate-300 p-3 bg-white" name="productId">
  {products.map((product) => (
    <option key={product.id} value={product.id}>
      {product.name}
    </option>
  ))}
</select>
        <button
          type="submit"
         className="rounded-xl bg-sky-600 hover:bg-sky-700 transition text-white py-3 font-semibold"
         >
          آپلود
        </button>
      </form>
    </section>
  );
}