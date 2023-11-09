 import { useAllContext } from "@/context/ContextProvider";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';


const CreateDraw = () => {
   
    
  
      const { state ,user} = useAllContext();
      const { products: product } = state;
      // router 
      const router = useRouter()
    
  
    

     
    
    
      /// image upload to cloudinary
      const [loading, setLoading] = useState(false);
      const [productLoading, setProductLoading] = useState(false);
    
      const [imageUrl, setImageUrl] = useState('');
    
    
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
            setImageUrl(data.secure_url);
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
    
      const onSubmit = (data) => {
       
        setProductLoading(true);
        const drawData = {
          title: data.title,
          status: true,
          id: id,
          email: user.email,
          images: imageUrl,
          price: data.price,
          stock: data.stock,
          date: new Date()
        };
        axios
       .post(`/api/draw/create`, drawData)
          .then((response) => {
            toast.success("Draw created successfully");
            setProductLoading(false);
            // router.push('/admin/products');
          })
          .catch((err) => {
            setProductLoading(false);
          });
      };
    
    
    return (
        <div>
        
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
             {...register("price", { required: true })}
              
              className="input w-full rounded input-bordered border-teal-600 form-control"
              type="text"
            />
          </label>
        </div>
        </div>
        <div className="flex w-full">
                                    
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
          <div className="flex flex-wrap relative items-center justify-center my-2 w-24 mx-auto">
             {
                imageUrl &&   <button className="absolute right-0 top-0 bg-rose-50 text-rose-600 py-1 px-2 rounded-full" onClick={()=>setImageUrl('')}>X</button>
             }
                              {/* Product image */}
           {
            imageUrl &&  <img
                  className="md:w-20 w-12 object-cover md:h-20 h-12 rounded"
                  src={imageUrl}
                />
           }
               
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

        
        <div className="my-6 mb-16 w-full flex justify-center">
          <input
            disabled={productLoading || !imageUrl.length}
            className="px-5 py-3 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed rounded text-teal-600 hover:bg-teal-200 bg-teal-100"
            type="submit"
            value={`${productLoading ? "Adding..." : "Create New Draw"}`}
          />
        </div>
      </form>
    </div>


        </div>
    );
};

export default CreateDraw;