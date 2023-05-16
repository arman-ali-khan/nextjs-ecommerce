import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { useAllContext } from '@/context/ContextProvider';
import axios from 'axios';
import { toast } from 'react-hot-toast';



const AddProducts = () => {
    const {state} = useAllContext()
    const {products:product} = state;

    // get id
    const count = product.count


    const animatedComponents = makeAnimated();

    const categoriesData = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    const tagsData = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]


      // get categories
      const [categories,setCategories] = useState([])
      // get tags
      const [tags,setTags] = useState([])


      /// image upload to cloudinary
      const [loading,setLoading] = useState(false)
      const [productLoading,setProductLoading] = useState(false)

      const [imageUrl,setImageUrl] = useState([])

      // image upload 
      const handleImageChange = (e) => {
        setLoading(true)
        const data = new FormData()
        data.append('file', e.target.files[0])
        data.append('upload_preset','nobinImage')
        data.append('cloud_name','dcckbmhft')
        fetch("https://api.cloudinary.com/v1_1/dcckbmhft/image/upload",{
            method:"post",
            body: data
            })
            .then(resp => resp.json())
            .then(data => {
                setImageUrl([... imageUrl, {
                    "original": data.url,
                    "thumbnail":data.url
                  },])
            setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
      }
      
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const id = (count+1).toString();
    console.log(id)
    const onSubmit = data => {
      setProductLoading(true)
        const productData = {
            title:data.title,
            status:true,
            id: id,
            images: imageUrl,
            price:data.price,
            oldPrice:data.oldPrice,
            description:data.description,
            categories: categories,
            tags: tags,
            rating: 0,
            stock: data.stock,
            SKU: data.sku,
            
        }
        axios.post(`/api/products/create`, productData)
        .then(response => {
            console.log(response.data)
            toast.success('Product created successfully')
            setProductLoading(false)
        }).catch(err => {
          setProductLoading(false)
        })
    };

   

    return (
        <div className="md:flex justify-center max-w-4xl">
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-auto">
            <label className="w-full">Title:
            <input
              {...register("title", { required: true })}
              className="input w-full  rounded input-bordered border-teal-600 form-control"
              type="text"
            />{" "}</label>
            <br />
            <label>SKU:
            <input
             {...register("sku", { required: true })}
              className="input w-24 rounded input-bordered border-teal-600 form-control"
              type="text"
            /></label>
          </div>

          <div className="flex w-full">
            <label className="w-full">Price:
            <input
             {...register("price", { required: true })}
              className="input w-full rounded input-bordered border-teal-600 form-control"
              type="text"
            /></label>
            <label className="w-full">Old Price:
            <input
             {...register("oldPrice", { required: true })}
              className="input w-full rounded input-bordered border-teal-600 form-control"
              type="text"
            /></label>
          </div>
          <div className="md:flex w-full">
            <label className="w-full">Description:
            <textarea
             {...register("description", { required: true })}
              className="textarea w-full rounded textarea-bordered border-teal-600 form-control"
              type="text"
            /></label>
            <br />

            <label>Stock:
            <input
             {...register("stock", { required: true })}
              className="input w-full rounded input-bordered border-teal-600 form-control"
              type="text"
            /></label>
          </div>
          <div>
            {/* {" images "} */}
           <div className='flex flex-wrap items-center justify-center my-2'>
           {
                imageUrl.map((image,i) =><img key={i} className='md:w-20 w-12 md:h-20 h-12 rounded' src={image.original}/>)
            }
           </div>
            <label>
                <div className="w-full h-44 border border-dashed border-teal-300 flex justify-center items-center my-2 hover:border-teal-600 duration-300">{
                    loading ? <div className="h-6 w-6 border-2 border-dashed border-teal-600 animate-spin"></div> : 'Upload Images'
                }</div>
            <input
            onChange= {(e)=> handleImageChange(e)}
              className="input w-full hidden rounded input-bordered border-teal-600 form-control"
              type="file"
            /></label>
          </div>

          <div className=" w-full">
            <label className="w-full">Categories:
           
            <Select
            onChange={(e)=>setCategories(e)}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={categoriesData}
    />
           </label>
            <br />
            <label>Tags:
            <Select
              onChange={(e)=>setTags(e)}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={tagsData}
    /></label>
          </div>
         <div className='my-6 mb-16 w-full flex justify-center'>
         <input disabled={!categories.length || !tags.length || !imageUrl.length}
            className="px-5 py-3 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed rounded text-teal-600 hover:bg-teal-200 bg-teal-100"
            type="submit"
            value={`${productLoading ? 'Adding...':'Add New Product'}`}
          />
         </div>
        </form>
      </div>
    );
};

export default AddProducts;