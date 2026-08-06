import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function ThemeC() {
    const [images, setImages] = useState([]);
    const [current, setCurrent] = useState(0);
    const [mode, setMode] = useState('Autoplay');

    useEffect(() => {
        if (localStorage.getItem('play-mode')) {
            setMode(localStorage.getItem('play-mode'));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('selected-theme', 'C');
    }, []);

    useEffect(() => {
        if (localStorage.getItem('images-uploaded')) {
            setImages(JSON.parse(localStorage.getItem('images-uploaded')));
        }
    }, []);

    useEffect(() => {
        if (images.length < 2) return;
        if (mode === 'Manual') return;

        const id = setInterval(() => {
            setCurrent((prev) => {
                if (mode === 'Random') {
                    return Math.floor(Math.random() * images.length);
                }
                return (prev + 1) % images.length;
            });
        }, 2000);

        return () => clearInterval(id);
    }, [images.length, mode]);
    
    return (
        <AppLayout>
            <div className="h-full w-full overflow-hidden flex items-center justify-center">
                <Carousel
                    selectedItem={current}
                    onChange={(index) => setCurrent(index)}
                    axis="vertical"
                    autoPlay={false}
                    interval={2000}
                    transitionTime={600}
                    dynamicHeight={false}
                    showArrows={true}
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={false}
                    useKeyboardArrows={true}
                    width={1000}
                    infiniteLoop={true}
                    swipeable={true}
                    className="flex flex-wrap"
                >
                    {images.map((image) => (
                        <div key={image.id} className="flex flex-col items-center justify-center">
                            <div className="w-full h-[550px] overflow-hidden">
                                <img src={image.content} alt="" className="w-full h-full object-cover" />
                            </div>
                            <p className="mt-1 font-black">{image.name}</p>
                        </div>
                    ))}
                </Carousel>
            </div>
        </AppLayout>
    );
}