import UserLayout from "@/Layout/UserLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Slider = () => {
    // loading
  const [uploading, setUploading] = useState(false);
  // selected image
  const [image, setImage] = useState("");
  // get secured  image
  const [url, setUrl] = useState("");
 
  // slider url
  const [sliderUrl,setSliderUrl] = useState('')

// update slider
const [update,setUpdate] = useState({})

// slider image upload on cloudinary
  const uploadImage = () => {
      const data = new FormData();
      setUploading(true);
      data.append("file", image);
      data.append("upload_preset", "nobinImage");
      data.append("cloud_name", "dcckbmhft");
      fetch("  https://api.cloudinary.com/v1_1/dcckbmhft/image/upload", {
          method: "post",
          body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.secure_url);
        const slider = {
            date: new Date(),
            image: data.secure_url,
            url: sliderUrl,
            alt:sliderUrl,
            status:false
            
        }
        axios.post(`/api/admin/slider/create`,slider)
        .then(res=>{
            console.log(res.data);
            toast.success('New Slider Added!')
            setUploading(false);
        })
    })
    .catch((err) => console.log(err));
    setUploading(false);
  };

// get all slider images
const [sliderImages,setSliderImatges] = useState([])

// get images
useEffect(()=>{
    axios.get(`/api/admin/slider`)
    .then(res=>{
        setSliderImatges(res.data)
        console.log(res.data);
    })
},[url,update])




// update slider
const handleSetSliderImage = data  =>{
  
  const slider = {
    status:!data.status
  }
  axios.delete(`/api/admin/slider/delete?id=${data._id}`)
  .then(res=>{
    if(res){
      toast.success('Slider Deleted')
      setUpdate(res);
    }
  })
}
const handleSelected = (e) =>{
  handleSetSliderImage(e)
}
  return (
    <UserLayout title={"Hero Slider"}>
      <div>
        <div className="flex justify-center w-full">
          <div>
            <div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                className="file file-input"
              />
            </div>
            <div>
              <input
                onChange={(e) => setSliderUrl(e.target.value)}
                type="url"
                placeholder="slider url"
                className="input input-bordered my-2"
              />
            </div>
            <div className="flex justify-center w-full my-3">
              <button onClick={()=>uploadImage()} className="btn btn-warning">
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {
            sliderImages.map(slider=><div key={slider._id} className="relative truncate">
            <div className="absolute">
              <button onClick={()=>handleSetSliderImage(slider)} className="btn btn-warning">Delete</button>
            </div>
            <img className="w-full h-32 md:h-24 rounded-md" src={slider.image} alt="" />
            <small className="">{slider.url}</small>
          </div>)
          }
        </div>
      </div>
    </UserLayout>
  );
};

export default Slider;
