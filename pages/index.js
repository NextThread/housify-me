import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper";

const Banner = () => {
  return (
    <div className="flex h-screen w-screen items-center">
      <div className="z-10 absolute w-screen h-screen bg-purple-300/25"></div>
      <div className="h-screen max-w-screen w-screen z-20 p-5">
        
        <div className="flex flex-col text-white text-shadow-3xl items-center mt-40 m-auto lg:max-w-[1200px]">
        <h1 className="lg:text-[55px] font-semibold leading-none mb-6">
            <span className="text-3xl lg:text-6xl font-bold font-body text-grey">Welcome To</span>
          </h1>
          <h1 className="lg:text-[58px] font-semibold leading-none mb-6">
            <span className="text-5xl lg:text-8xl font-bold font-body text-black">HousifyMe</span>
          </h1>
          <h1 className="lg:text-[58px] font-semibold leading-none mb-6">
            <span className="text-2xl lg:text-5xl font-bold font-body">CHOOSE YOUR HOME WITH US</span>
          </h1>
          <p className="max-w-[500px] w-full flex items-center font-bold font-body2 text-lg lg:text-3xl mb-8">
          
          </p>
          <div className="flex justify-evenly w-96 mt-10">
          
            <Link href="/uploadHouse">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-8 rounded-lg">
                OWNER
              </button>
            </Link>
            <Link href="/house">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-8 rounded-lg">
                CUSTOMER
              </button>
            </Link>
          </div>

          <div className="flex flex-col text-white text-shadow-3xl items-center mt-35 m-auto lg:max-w-[800px]">
          <h1 className="lg:text-[55px] font-semibold leading-none mb-6">
            <span className="text-1xl lg:text-2xl font-bold font-body text-red" >Made with</span>
            <span className="text-2xl lg:text-3xl font-bold font-body textcolor-red" style={{ color: 'red' }} >  ❤  </span>
            <span className="text-1xl lg:text-2xl font-bold font-body text-red"> by </span>
            {/* <span className="text-2xl lg:text-6xl font-bold font-body text-red" href = "https://www.linkedin.com/in/anurag31oct/"> Anurag Roy</span> */}
            <a href='https://www.linkedin.com/in/anurag31oct/'>Anurag Roy</a>
          </h1>

          </div>



        </div>
      </div>
      <div className="w-screen absolute z-0 right-0 bottom-0 h-screen">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              className="object-fill w-full h-screen rounded-md"
              src="https://wallpaperaccess.com/full/203392.jpg"
              alt="image slide 1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="object-fill w-full h-screen rounded-md"
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmlsbGF8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
              alt="image slide 3"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="object-fill w-full h-screen rounded-md"
              src="https://wallpaperaccess.com/full/1126753.jpg"
              alt="image slide 3"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
