import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PiChatCenteredDotsBold } from "react-icons/pi";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";

export default function ProductsRes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  const { data: categories } = useQuery({
    queryKey: ["categories", q],
    queryFn: async () => {
      return await fetch("https://dummyjson.com/products/categories").then(
        (res) => res.json()
      );
    },
  });
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products", q, category],
    queryFn: async () => {
      let url = `https://dummyjson.com/products/search?q=${q}`;
      if (category && category !== "Select category") {
        url = `https://dummyjson.com/products/category/${category}`;
      }
      return await fetch(url).then((res) => res.json());
    },
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }
  return (
    <>
      <div className="mt-10 flex flex-col justify-center items-center ">
        <div className="flex  justify-center items-center gap-2 ">
          <PiChatCenteredDotsBold className="h-16 w-16 text-slate-400" />
          <h1 className="text-5xl text-slate-400">QuillBot Search</h1>
        </div>
        <div className="flex gap-4 mt-4 flex-row">
          <input
            onChange={debounce((e) => {
              setSearchParams((prev) => {
                prev.set("q", e.target.value);
                return prev;
              });
            }, 700)}
            type="text"
            name="price"
            id="price"
            className="block   rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Search for products"
          />

          <select
            className="border p-2"
            onChange={(e) => {
              setSearchParams((prev) => {
                prev.set("skip", 0);
                prev.delete("q");
                prev.set("category", e.target.value);
                return prev;
              });
            }}
          >
            <option>Select category</option>
            {categories?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-8  ">
        {products?.products.map((product) => (
          <>
            <div
              key={product.id}
              className="flex flex-col mx-auto mb-4 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src={product.thumbnail}
                alt={product.title}
              />
              <div className="flex flex-col justify-between p-4 leading-normal ">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {product.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {product.description}
                </p>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
