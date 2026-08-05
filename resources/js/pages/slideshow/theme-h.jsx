import AppLayout from '@/layouts/app-layout';
import gsap from 'gsap';
import { useEffect, useState } from 'react';

export default function ThemeH() {
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
        images.forEach((_, i) => {
            gsap.to(`.currentImg-${i}`, {
                opacity: i === current ? 1 : 0,
                duration: 0.8,
                ease: 'power1.inOut',
            });
            gsap.to(`.currentCaption-${i}`, {
                opacity: i === current ? 1 : 0,
                duration: 0.8,
                ease: 'power1.inOut',
            });
        });
    }, [images, current]);

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
            <div className="flex flex-col items-center">
                <div className="relative" style={{ width: 600, height: 450 }}>
                    {images.map((image, i) => (
                        <div key={i} className="absolute inset-0 flex flex-col items-center">
                            <img src={image.content} className={`currentImg-${i} h-[400px] w-full object-cover`} style={{ opacity: 0 }} />
                            <p className={`currentCaption-${i} pt-3 text-center font-semibold`} style={{ opacity: 0 }}>
                                {image.name}
                            </p>
                        </div>
                    ))}
                </div>
                {mode === 'Manual' && (
                    <div className="flex gap-3">
                        <button
                            onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)}
                            className="rounded-2xl bg-black p-3 text-white"
                        >
                            Prev
                        </button>
                        <button onClick={() => setCurrent((prev) => (prev + 1) % images.length)} className="rounded-2xl bg-black p-3 text-white">
                            Next
                        </button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
