import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <button type="button" className="slick-prev">Previous</button>,
    nextArrow: <button type="button" className="slick-next">Next</button>
  };

  const images = [
    { id: 1, url: 'https://www.apnabazar.se/malmo/wp-content/uploads/2018/08/slider1.jpg', alt: 'Image 1' },
    { id: 2, url: 'https://t8e5h5n7.stackpathcdn.com/wp-content/uploads/2017/06/slider-1-min-1.jpg', alt: 'Image 2' },
    { id: 3, url: 'https://www.bluemountainpeak.com/pub/media/homepage_slider/fruit-and-vegetable-banner.jpg', alt: 'Image 3' },
  ];

  return (
    <Slider {...settings}>
    {images.map((image) => (
      <div className='h-56 md:h-96 rounded-md' key={image.id}>
        <img className='w-full h-full object-cover rounded-md' src={image.url} alt={image.alt} />
      </div>
    ))}
  </Slider>
  );
};

export default HeroSlider;

