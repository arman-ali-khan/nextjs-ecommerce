import Layout from "@/Layout/Layout";
import ProductCard from "@/components/Products/ProductCard";
import React, { useState } from "react";

const category = ({ data: category, category: title }) => {
  const [loading, setLoading] = useState(false);
  // Products count
  const [count, setCount] = useState(0);
  // pagination
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  // page count
  const pages = Math.ceil(count / size);
  // title
  const categoryTitle = title.split("-").join(" ").toUpperCase();
  console.log(categoryTitle);
  return (
    <Layout title={`All files archived ${categoryTitle}`}>
      <div className="w-full md:flex flex-col container mx-auto gap-2 my-12 overflow-hidden">
        <div class="flex items-center justify-between my-3 bg-orange-100 border border-gray-100 rounded p-3">
          <h6 class="text-sm ">
            Total <span class="font-bold">{category.length}</span> items Found
          </h6>
          <span class="text-sm ">
            <select class="py-0 text-sm select select-sm font-medium block w-full rounded border-0 bg-white pr-10 cursor-pointer focus:ring-0">
              <option class="px-3" value="All" hidden="">
                Sort By Price
              </option>
              <option class="px-3" value="Low">
                Low to High
              </option>
              <option class="px-3" value="High">
                High to Low
              </option>
            </select>
          </span>
        </div>
        {category.length > 0 ? (
          <div className="md:w-full">
            <div>
              {/* Home tags */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {category.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
              {/* pagination */}
              <div className="flex justify-center w-full my-3">
                <div className="btn-group">
                  {[...Array(12).keys()].map((number) => (
                    <button
                      disabled={page === number}
                      key={number}
                      onClick={() => setPage(number)}
                      onClickCapture={() => setLoading(true)}
                      className={`btn btn-xs md:btn-sm ${
                        page === number ? "btn-primary" : "btn-ghost"
                      } border shadow-lg disabled:bg-primary disabled:text-white`}
                    >
                      {number + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="md:w-6/12">
            <p className="flex justify-center">No data in {categoryTitle}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default category;

export async function getServerSideProps(context) {
  const { category } = context.query;
  console.log(category);
  // Fetch data for the given id
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_PRO}/api/category/${category}`
  );
  const data = await res.json();

  return {
    props: { data, category },
  };
}
