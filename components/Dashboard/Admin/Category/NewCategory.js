import UserLayout from '@/Layout/UserLayout';
import { useAllContext } from '@/context/ContextProvider';
import { accessToken } from '@/hooks/setToken';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { MdCancel } from 'react-icons/md';

const NewCategory = () => {

    // get context
    const {user} = useAllContext()

    // react hook form
    const { register, handleSubmit, watch, formState: { errors } } = useForm();


    const [category,setCategory] = useState('')

    // image url
    const [image,setImage] = useState('')

    // image upload loading

    const [loading,setLoading] = useState(false)

    // create loading '
    const [catLoading,setCatLoading] = useState(false)


    const handleUploadImage= (e) =>{
        setLoading(true)
        // upload image into cloudinary storage
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
        setImage(data.secure_url)
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
    }

    const token = localStorage.getItem('accessToken')

    const handleCreateCategory = (data) => {
        setCatLoading(true)
        const value = data.label.split(' ').join('-');
        
        const categoryData= {
            label: data.label,
            value: value.toLowerCase(),
            icon: image,
        }
        axios.post(`/api/category/create?email=${user.email}`, categoryData,{
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        .then(res=>{
            console.log(res.data)
            toast.success('Category created successfully')
            setCatLoading(false)
        })
        .catch(err=>{
            console.log(err)
            toast.error('sumthing want wrong')    
            setCatLoading(false)    
        })
    }
    return (
        <UserLayout title={'Create New Category'}>
            <form onSubmit={handleSubmit(handleCreateCategory)} className='flex w-full items-center justify-center mb-16'>
                <div className="form-group">
                <div className='flex flex-col'>
                  <div className='flex items-center gap-2'>
                  {
                    image && <div className='relative'>
                        <img className='w-12 h-12 rounded' src={image} alt="" />
                        <span onClick={()=>setImage('')} className='absolute -top-1 -right-2 text-2xl cursor-pointer text-rose-500'><MdCancel /></span>
                    </div>
                  }
                    <p className='font-bold'>{category}</p>
                  </div>
                <label className='w-full' htmlFor="name">image</label>
                    <input 
                    onChange={(e)=>handleUploadImage(e)} type='file' className='file-input file-input-bordered w-full'/>
                </div>
                    <label className='w-full' htmlFor="name">Label</label>
                    <input {...register("label", { required: true })} onChange={(e)=>setCategory(e.target.value)} type='text' className='form-control input input-bordered w-full'/>
                    
                    <button type='submit' className='bg-teal-600 text-white px-4 py-2 rounded w-full my-3'>{loading ? 'Image uploading...':`${catLoading?'Creating...':'Create Category'}`}</button>
                </div>
            </form>
        </UserLayout>
    );
};

export default NewCategory;