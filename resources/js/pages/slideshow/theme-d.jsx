import AppLayout from '@/layouts/app-layout';
import gsap from 'gsap';
import { useEffect, useState } from 'react';

export default function ThemeD() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('images-uploaded')) {
            setImages(JSON.parse(localStorage.getItem('images-uploaded')));
        }
    }, []);

    useEffect(() => {
        let tl = gsap.timeline();
        const rotation = (id) => {
            if (id % 2) {
                return Math.random()*5;
            } else {
                return Math.random()*-5;
            }
        };
        const from = (rotation) => {
          if (rotation < 0) {
            return 2000
          } else {
            return -2000
          }
        }

        images.forEach((image) => {
            tl.fromTo(
                `.img-${image.id}`,
                {
                    x: from(rotation(image.id)),
                    y: 0,
                    rotate: 0,
                    delay: 1,
                },
                {
                    x: 0,
                    y: 0,
                    rotate: rotation(image.id),
                    duration: 2,
                },
            );
        });
    }, [images]);

    return (
        <AppLayout>
            <div className="flex">
                <div  className="w-full min-h-full  overflow-x-clip flex flex-col items-center justify-start pt-10 ">
                {images.map((image) => (
                        <div key={image.id} className={`img-${image.id} fixed`}>
                            <img src={image.content} alt="" className="rounded-[5px] border-3 h-[70vh] border-white" />
                            <p className="bg-white text-black p-1">{image.name}</p>
                        </div>
                ))}
                </div>
            </div>
        </AppLayout>
    );
}
