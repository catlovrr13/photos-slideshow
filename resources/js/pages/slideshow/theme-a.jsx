import AppLayout from '@/layouts/app-layout'
import React, { useEffect, useState } from 'react'

export default function ThemeA() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("images-uploaded")) {
      setImages(JSON.parse(localStorage.getItem("images-uploaded")))
    }
  }, [])

  console.log(images)
  return (
    <AppLayout>
        <div className='m-10'>
          {images.map((image) => (
            <div key={image.id} className='flex justify-center items-center'>
              <img src={image.content} alt="" width={900} height={900}/>
            </div>
          ))}
        </div>
    </AppLayout>
  )
}
