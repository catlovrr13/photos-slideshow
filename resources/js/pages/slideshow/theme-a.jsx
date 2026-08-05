import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function ThemeA() {
    const [images, setImages] = useState([]);
    const [current, setCurrent] = useState(0);
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
        if (images.length < 2) return;
        if (mode === "Manual") return;

        const id = setInterval(() => {
            setCurrent((prev) => {
              if (mode === "Random") {
                return Math.floor(Math.random() * images.length)
              }
              return (prev + 1) % images.length
            });
        }, 2000);

        return () => clearInterval(id);
    }, [images.length, mode]);

    return (
        <AppLayout>
            <div className="m-10">
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
                    className="flex w-300 flex-wrap items-center justify-center"
                >
                    {images.map((image) => (
                        <div key={image.id} className="mb-10 flex flex-col items-center justify-center">
                            <img src={image.content} alt="" width={500} height={500} />
                            <p className="mt-5 font-black">{image.name}</p>
                        </div>
                    ))}
                </Carousel>
            </div>
        </AppLayout>
    );
}
