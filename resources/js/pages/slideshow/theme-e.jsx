import AppLayout from '@/layouts/app-layout';
import React, { useEffect, useState } from 'react';
import gsap from "gsap"

export default function ThemeE() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('images-uploaded')) {
            setImages(JSON.parse(localStorage.getItem('images-uploaded')));
        }
    }, []);

    useEffect(() => {
      if (images.length < 2) return;
      
      const tl = gsap.timeline({repeat: -1})

      images.forEach((_, i) => {
        gsap.set(`.left-door-${i}, .right-door-${i}`, {
          rotationY: 0,
          zIndex: images.length - i
        })
      })

      images.forEach((_,i) => {
        const nextImg = (i + 1) % images.length

        tl.to(`.left-door-${i}`, { rotationY: -110,  duration: 1}, "+=2")
        tl.to(`.right-door-${i}`, { rotationY: 110,  duration: 1}, "<")

        tl.set(`.left-door-${i}, .right-door-${i}`, { rotationY: 0, zIndex: 0 })
        tl.set(`.left-door-${nextImg}, .right-door-${nextImg}`, { zIndex: images.length })
      })

      return () => tl.kill()
    }, [images])

    return (
        <AppLayout>
            <div className="m-10 flex justify-center">
                <div className="relative" style={{ width: 900, height: 600, perspective: 1200 }}>
                    {images.map((image, i) => (
                        <React.Fragment key={i}>
                            <div
                                className={`left-door-${i} absolute top-0 left-0 h-full w-1/2 overflow-hidden`}
                                style={{ transformOrigin: 'left center' }}
                            >
                                <img src={image.content} className="h-full max-w-none object-cover" style={{ width: 900 }} />
                            </div>

                            <div
                                className={`right-door-${i} absolute top-0 right-0 h-full w-1/2 overflow-hidden`}
                                style={{ transformOrigin: 'right center' }}
                            >
                                <img src={image.content} className="h-full max-w-none absolute right-0 object-cover" style={{ width: 900 }} />
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
