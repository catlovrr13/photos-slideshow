import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';

export default function ThemeF() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('images-uploaded')) {
            setImages(JSON.parse(localStorage.getItem('images-uploaded')));
        }
    }, []);

        useEffect(() => {
        localStorage.setItem('selected-theme', 'F');
    }, []);

    return (
        <AppLayout>
            <div className='relative w-full h-full justify-center flex'>
              {images.map((image) => (
                        <div key={image.id} className="flex absolute flex-col items-center justify-center">
                            <img src={image.content} alt="" width={500} height={400} />
                            <p className="mt-5 font-black">{image.name}</p>
                        </div>
                    ))}
            </div>
        </AppLayout>
    );
}
