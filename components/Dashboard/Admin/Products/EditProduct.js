import UserLayout from "@/Layout/UserLayout";
import { useAllContext } from "@/context/ContextProvider";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineRight } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CreatableSelect from 'react-select/creatable';

const EditProduct = ({product}) => {
  const { state,user } = useAllContext();
 
// router
const router = useRouter();

  const animatedComponents = makeAnimated();
  const categoriesData = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const tagsData = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  // get categories
  const [categories, setCategories] = useState(product?.categories);
  // get tags
  const [tags, setTags] = useState(product?.tags);
  // get unit
  const [unit,setUnit] = useState(product?.unit);
  const [qunatity,setQunatity] = useState(product?.qunatity);

  /// image upload to cloudinary
  const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState(product?.images);


  // image upload
  const handleImageChange = (e) => {
    setLoading(true);
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "nobinImage");
    data.append("cloud_name", "dcckbmhft");
    fetch("https://api.cloudinary.com/v1_1/dcckbmhft/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setImageUrl([
          ...imageUrl,
          {
            original: data.secure_url,
            thumbnail: data.secure_url,
          },
        ]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  // access token
  const token = typeof window !== 'undefined' && localStorage.getItem('accessToken')
  // react hoot form

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setProductLoading(true);
    const productData = {
      title: data.title,
      status: true,
      images: imageUrl,
      price: data.price,
      oldPrice: data.oldPrice,
      description: data.description,
      categories: categories,
      tags: tags,
      rating: 0,
      stock: data.stock,
      SKU: data.sku,
      size:[],
      color:[],
      weight:[],
      unit: unit,
      qunatityPrice: qunatity,
    };

    axios
      .put(`/api/product/update?id=${product?.id}&email=${user.email}`, productData,{
        headers: {
                  authorization: `Bearer ${token}`,
                },
      })
      .then((response) => {
        toast.success("Product Updated successfully");
        setProductLoading(false);
        router.push('/admin/products')
      })
      .catch((err) => {
        setProductLoading(false);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  const handleImageUpdate = (id)=>{
   const imageUrlNew = imageUrl.filter((image,i)=>image.original !== id)
   setImageUrl(imageUrlNew);
  }
  
  return (
   <UserLayout title={`Edit ${product?.title}`}>
     <div className="md:flex justify-center max-w-4xl px-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="w-full"> 
            Title:
            <input
            defaultValue={product?.title}
              {...register("title", { required: true })}
              className="input w-full  rounded input-bordered border-teal-600 form-control"
              type="text"
            />
          </label>
          <br />
        </div>

        <div className=" w-full items-center">
       

        <div className="flex w-full items-center">
        <label className="w-full">
            Price* :
            <input
            defaultValue={product?.price}
             {...register("oldPrice", { required: true })}
              
              className="input w-full rounded input-bordered border-teal-600 form-control"
              type="text"
            />
          </label>
          <label className="w-full">
          Sale Price* :
            <span className="flex items-center">
              <AiOutlineRight />
              <input
              defaultValue={product?.oldPrice}
               {...register("price", { required: true })}
                className="input w-full rounded input-bordered border-teal-600 form-control"
                type="text"
              />
            </span>
          </label>
        </div>
        <div className="flex w-full">
         
          <label className="w-full flex flex-col">
            Per:
            <select defaultValue={product?.qunatityPrice} onChange={(e)=>setQunatity(e.target.value)} className="select w-full select-bordered">
              <option key={''} value={''} >Select setQunatity</option>
              <option key={'1/2'} value={'1/2'}>1/2</option>
              <option key={'1'} value={'1'}>1</option>
              <option key={'1.5'} value={'1.5'}>1.5</option>
              <option key={'2'} value={'2'}>2</option>
              <option key={'2.5'} value={'2.5'}>2.5</option>
              <option key={'3'} value={'3'}>3</option>
              <option key={'3.5'} value={'3.5'}>3.5</option>
              <option key={'4'} value={'4'}>4</option>
              <option key={'4.5'} value={'4.5'}>4.5</option>
              <option key={'5'} value={'5'}>5</option>
            </select>
          </label>
         
          <label className="w-full flex flex-col">
            Unit:
            <select defaultValue={product?.unit} onChange={(e)=>setUnit(e.target.value)} className="select w-full select-bordered">
              <option key={''} value={''}>Select Category</option>
              <option key={'Liter'} value={'Liter'}>Liter</option>
              <option key={'Piece'} value={'Piece'}>Piece</option>
              <option key={'KG'} value={'KG'}>KG</option>
              <option key={'Gram'} value={'Gram'}>Gram</option>
            </select>
          </label>
        </div>
       
        </div>
        <div className="md:flex w-full">
          <label className="w-full">
            Description:
            <textarea
            defaultValue={product?.description}
              {...register("description", { required: true })}
              className="textarea w-full rounded textarea-bordered border-teal-600 form-control"
              type="text"
            />
          </label>
          <br />
        </div>
        <div className="flex w-full">
          <label className="w-full">
            SKU:
            <input placeholder="VG123A"
            defaultValue={product?.SKU}
              {...register("sku", { required: true })}
              className="input w-full rounded input-bordered border-teal-600 form-control"
              type="text"
            />
          </label>
          <label className="w-full">
            Stock:
            <input placeholder="123"
            defaultValue={product?.stock}
              {...register("stock", { required: true })}
              className="input w-full rounded input-bordered border-teal-600 form-control"
              type="text"
            />
          </label>
        </div>
        <div>
          {/* {" images "} */}
          <div className="flex flex-wrap items-center justify-center my-2">
            {imageUrl.map((image, i) => (
              <div key={i} className="relative">
                {/*  image remove btn */}
                <span onClick={()=>handleImageUpdate(image.original)} className="absolute cursor-pointer top-0 right-0 text-xl text-rose-400"><MdCancel /></span>

                {/* Product image */}
                <img
                  key={i}
                  className="md:w-20 w-12 object-cover md:h-20 h-12 rounded"
                  src={image.original}
                />
              </div>
            ))}
          </div>
          <label>
            <div className="w-full h-44 border border-dashed border-teal-300 flex justify-center items-center my-2 hover:border-teal-600 duration-300">
              {loading ? (
                <div className="h-12 w-12 border-2 border-dashed border-teal-600 rounded-full animate-spin"></div>
              ) : (
                "Upload Images"
              )}
            </div>
            <input
              onChange={(e) => handleImageChange(e)}
              className="input w-full hidden rounded input-bordered border-teal-600 form-control"
              type="file"
            />
          </label>
        </div>

        <div className=" w-full">
          <label className="w-full">
            Categories:
            <Select
              onChange={(e) => setCategories(e)}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={categoriesData}
              defaultValue={product?.categories} 
            />
          </label>
          <br />
          <label>
            Tags:
            <CreatableSelect isClearable
              onChange={(e) => setTags(e)}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={tagsData}
              defaultValue={product?.tags}
            />
          </label>
        </div>
        <div className="my-6 mb-16 w-full flex justify-center">
          <input
            disabled={!categories.length || !tags.length || !imageUrl.length}
            className="px-5 py-3 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed rounded text-teal-600 hover:bg-teal-200 bg-teal-100"
            type="submit"
            value={`${productLoading ? "Updating..." : "Update Product"}`}
          />
        </div>
      </form>
    </div>
   </UserLayout>
  );
};

export default EditProduct;
