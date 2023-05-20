import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import makeAnimated from "react-select/animated";
import Creatable from 'react-select/creatable';
import Select from "react-select";
import { useAllContext } from "@/context/ContextProvider";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import CreatableSelect from 'react-select/creatable';
import { Router, useRouter } from "next/router";
import { v4 as uuidv4 } from 'uuid';

const AddProducts = () => {
  const { state } = useAllContext();
  const { products: product } = state;
  // router 
  const router = useRouter()

  // get id
  const count = product.count;

  const animatedComponents = makeAnimated();

  // get categories
  const [categoriesData,setCategoriesData] = useState();
 useEffect(()=>{
  axios.get('/api/categories')
  .then(response => setCategoriesData(response.data))
   .catch(error => console.log(error))
 },[])
 
 

  // get categories
  const [categories, setCategories] = useState([]);
  // get tags
  const [tags, setTags] = useState([]);
  // get unit
  const [unit,setUnit] = useState('');
  const [qunatity,setQunatity] = useState('');

  /// image upload to cloudinary
  const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState([]);


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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const id = uuidv4().split('-')[0]
  console.log(id);
  const onSubmit = (data) => {
    setProductLoading(true);
    const productData = {
      title: data.title,
      status: true,
      id: id,
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
      unit: data.unit,
      qunatityPrice: qunatity,
    };
    axios
      .post(`/api/products/create`, productData)
      .then((response) => {
        console.log(response.data);
        toast.success("Product created successfully");
        setProductLoading(false);
        router.push('/admin/products');
      })
      .catch((err) => {
        setProductLoading(false);
      });
  };

  const handleImageUpdate = (id)=>{
   const imageUrlNew = imageUrl.filter((image,i)=>image.original !== id)
   setImageUrl(imageUrlNew);
  }
  
  return (
    <div className="md:flex justify-center max-w-4xl px-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="w-full"> 
            Title:
            <input
              {...register("title", { required: true })}
              className="input w-full  rounded input-bordered border-teal-600 form-control"
              type="text"
            />{" "}
          </label>
          <br />
        </div>

        <div className=" w-full items-center">
       

        <div className="flex w-full items-center">
        <label className="w-full">
            Price* :
            <input
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
               {...register("price", { required: true })}
                className="input w-full rounded input-bordered border-teal-600 form-control"
                type="text"
              />
            </span>
          </label>
        </div>
        <div className="flex w-full">
         
         
          <label className="w-full flex flex-col">
            Unit:
            <select className="select w-full select-bordered">
              <option onClick={()=>setUnit('')}>Select Category</option>
              <option onClick={()=>setUnit('Liter')}>Liter</option>
              <option onClick={()=>setUnit('Piece')}>Piece</option>
              <option onClick={()=>setUnit('KG')}>KG</option>
              <option onClick={()=>setUnit('Gram')}>Gram</option>
            </select>
          </label>
        </div>
       
        </div>
        <div className="md:flex w-full">
          <label className="w-full">
            Description:
            <textarea
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
              {...register("sku", { required: true })}
              className="input w-full rounded input-bordered border-teal-600 form-control"
              type="text"
            />
          </label>
          <label className="w-full">
            Stock:
            <input placeholder="123"
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
              <div className="relative">
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
              options={categoriesData}
            />
          </label>
        </div>
        <div className="my-6 mb-16 w-full flex justify-center">
          <input
            disabled={!categories.length || !tags.length || !imageUrl.length}
            className="px-5 py-3 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed rounded text-teal-600 hover:bg-teal-200 bg-teal-100"
            type="submit"
            value={`${productLoading ? "Adding..." : "Add New Product"}`}
          />
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
