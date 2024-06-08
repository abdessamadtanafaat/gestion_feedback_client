const slides = [];
const sliderSettings = {
  accessibility: true,
  dots: false,
  infinite: slides.length >= 3,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: slides.length >= 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: slides.length >= 3,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

export default sliderSettings;