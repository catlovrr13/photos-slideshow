import AppLayout from '@/layouts/app-layout'
import React, { useEffect, useState } from 'react'
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"


export default function ThemeC() {
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
          axis='vertical'
          autoPlay={true}
          interval={1000}
          transitionTime={100}
          dynamicHeight={true}
          showArrows={true}
          useKeyboardArrows={true}
          width={550}
          infiniteLoop={true}
          swipeable={false}
          centerMode={true}
          centerSlidePercentage={100}
          className='flex flex-wrap w-300 justify-center items-center'
          >
          {images.map((image) => (
            <div key={image.id} className='flex justify-center items-center flex-col mb-10'>
              <img src={image.content} alt="" width={500} height={500}/>
              <p className="font-black mt-1">{image.name}</p>
            </div>
          ))}
          </Carousel>
        </div>
    </AppLayout>
  )
}
