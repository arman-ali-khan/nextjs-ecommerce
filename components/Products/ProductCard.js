import React, { useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";
import ProductModal from "./SingleProduct/ProductModal";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const [data, setData] = useState("");
  console.log(data);
  return (
    <div
      className={`shadow-xl rounded-md
      }`}
    >
      <label
        className="cursor-pointer"
        onClick={() => setData(product.price)}
        htmlFor="productModal"
      >
        <div className={`h-60 bg-base-100 hover:scale-125 duration-300`}>
          <img src={product.images[0].original} alt="" />
        </div>

        <div className={`flex items-center justify-between px-3`}>
          <div>
            <div className="flex !justify-between gap-3 tooltip items-center ">
              <h4
                className="text-teal-600 flex gap-1 text-sm font-bold tooltip"
                data-tip={`Original Price ${product.price}৳ Discount Price ${
                  product.price - 100
                }৳`}
              >
                ৳{product.price}
                <span className="text-gray-500 text-sm font-thin line-through">
                  ৳{product.price - 100}
                </span>
              </h4>
              <div>
                <span className="flex items-center">
                  {[...Array(product.rating).keys()].map((rate, i) => (
                    <span
                      data-tip={`${product.rating} Star Rating`}
                      className="text-yellow-500 tooltip text-xs md:text-base"
                      key={i}
                    >
                      <BsStarFill />
                    </span>
                  ))}
                </span>
              </div>
            </div>
            <Link
              href={`/product/${product.id}`}
              className="md:text-base inline-block leading-4 text-teal-600 text-sm font-bold"
            >
              {product.title}
            </Link>
          </div>
        </div>
      </label>
      <div
        className={`flex cursor-pointer select-none justify-between items-center bg-gray-100 duration-300 border border-teal-600  pl-4 hover:bg-teal-600 rounded hover:text-white text-teal-600`}
      >
        <button>Add To Cart</button>
        <span className=" px-4 py-2">
          <MdOutlineAdd size={20} />
        </span>
      </div>
      <div>
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="productModal" className="modal-toggle " />
        <label htmlFor="productModal" className="modal cursor-pointer">
          <label className="modal-box relative w-11/12 max-w-5xl" htmlFor="">
            <h3 className="text-lg font-bold">{product.model}</h3>
            <p className="py-4">
              You've been selected for a chance to get one year of subscription
              to use Wikipedia for free!
            </p>
            <div className="flex justify-end">
              <label
                className="px-4 py-2 text-white rounded bg-teal-600"
                htmlFor="productModal"
              >
                Close
              </label>
            </div>
          </label>
        </label>
      </div>
    </div>
  );
};

export default ProductCard;
