import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: (
      <button type="button" className="slick-prev">
        Previous
      </button>
    ),
    nextArrow: (
      <button type="button" className="slick-next">
        Next
      </button>
    ),
  };
  // get all slider images
  const [sliderImages, setSliderImatges] = useState([]);
console.log(sliderImages);
  // loading
  const [loading, setLoading] = useState(true);
  // get images
  useEffect(() => {
    axios.get(`/api/admin/slider`).then((res) => {
      setSliderImatges(res.data);
      setLoading(false);
    });
  }, [loading]);

  return (
    <Slider {...settings}>
      {loading ? (
        <div className="h-56 w-full md:h-96 flex items-center justify-center">
          <div className="h-56 w-full md:h-96 rounded-md bg-blue-100 text-blue-600 flex justify-center items-center">
            <div>
            Loading...
            </div>
          </div>
        </div>
      ) : (
        sliderImages.map((image, i) => (
          <div className={`h-56 md:h-96 rounded-md`} key={image._id}>
            <a href={image.url}>
              <img
                className={`w-full h-full object-cover rounded-md`}
                src={image.image}
                alt={image.alt}
              />
            </a>
          </div>
        ))
      )}
    </Slider>
  );
};

export default HeroSlider;
