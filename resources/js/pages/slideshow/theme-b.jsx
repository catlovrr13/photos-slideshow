import AppLayout from '@/layouts/app-layout'
import React, { useEffect, useState } from 'react'
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

export default function ThemeB() {
    const [images, setImages] = useState([]);
  
    useEffect(() => {
      if (localStorage.getItem("images-uploaded")) {
        setImages(JSON.parse(localStorage.getItem("images-uploaded")))
      }
    }, [])
  return (
    <AppLayout>
        <div className='m-10'>
          <Carousel
          autoPlay={true}
          interval={2000}
          transitionTime={200}
          dynamicHeight={false}
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          useKeyboardArrows={true}
          width={500}
          infiniteLoop={true}
          swipeable={false}
          className='flex flex-wrap w-300 justify-center items-center'
          >
          {images.map((image) => (
            <div key={image.id} className='flex justify-center items-center flex-col mb-10 w-full h-full'>
              <img src={image.content} alt="" width={900} height={900}/>
              <p className="font-black mt-5 ">{image.name}</p>
            </div>
          ))}
          </Carousel>
        </div>
    </AppLayout>
  )
}
