import AppLayout from '@/layouts/app-layout';
import gsap from 'gsap';
import { useEffect, useState } from 'react';

export default function ThemeD() {
    const [images, setImages] = useState([]);
    const [mode, setMode] = useState('Autoplay');

    useEffect(() => {
        if (localStorage.getItem('play-mode')) {
            setMode(localStorage.getItem('play-mode'));
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('images-uploaded')) {
            setImages(JSON.parse(localStorage.getItem('images-uploaded')));
        }
    }, []);

    useEffect(() => {
        let tl = gsap.timeline();
        const rotation = (id) => {
            if (id % 2) {
                return Math.random() * 5;
            } else {
                return Math.random() * -5;
            }
        };
        const from = (rotation) => {
            if (rotation < 0) {
                return 2000;
            } else {
                return -2000;
            }
        };

        images.forEach((image, i) => {
            tl.fromTo(
                `.img-${i}`,
                {
                    x: from(rotation(i)),
                    y: 0,
                    rotate: 0,
                    delay: 1,
                },
                {
                    x: 0,
                    y: 0,
                    rotate: rotation(i),
                    duration: 2,
                },
            );
        });
    }, [images]);

    return (
        <AppLayout>
            <div className="flex">
                <div className="flex min-h-full w-full flex-col items-center justify-start overflow-x-clip pt-10">
                    {images.map((image, i) => (
                        <div key={i} className={`img-${i} fixed`}>
                            <img src={image.content} alt="" className="h-[70vh] rounded-[5px] border-3 border-white" />
                            <p className="bg-white p-1 text-black">{image.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
