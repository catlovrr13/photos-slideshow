import AppLayout from '@/layouts/app-layout'
import React, { useEffect, useState } from 'react'
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

export default function ThemeA() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("images-uploaded")) {
      setImages(JSON.parse(localStorage.getItem("images-uploaded")))
    }
  }, [])

  useEffect(() => {
    if (images.length < 2) return;

    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(id);
  }, [images.length]);

  return (
    <AppLayout>
      <div className='m-10'>
        <Carousel
          selectedItem={current}
          onChange={(index) => setCurrent(index)}
          autoPlay={false}
          transitionTime={0}
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
            <div key={image.id} className='flex justify-center items-center flex-col mb-10'>
              <img src={image.content} alt="" width={500} height={500} />
              <p className="font-black mt-5">{image.name}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </AppLayout>
  )
}