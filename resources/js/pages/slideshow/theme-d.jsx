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
                return 5;
            } else {
                return -5;
            }
        };
        const from = (rotation) => {
          if (rotation == -5) {
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
                    x: 100,
                    y: 0,
                    rotate: rotation(image.id),
                    duration: 2,
                },
            );
        });
    }, [images]);

    return (
        <AppLayout>
            <div className="m-10">
                {images.map((image) => (
                    <div key={image.id} className="absolute mb-10 flex flex-col items-center justify-center">
                        <div className={`img-${image.id}`}>
                            <img src={image.content} alt="" width={900} height={900} className="rounded-[5px] border-3 border-white" />
                            <p className="">{image.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
