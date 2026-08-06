import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';

export default function ThemeG() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('images-uploaded')) {
            setImages(JSON.parse(localStorage.getItem('images-uploaded')));
        }
    }, []);

        useEffect(() => {
        localStorage.setItem('selected-theme', 'G');
    }, []);
    return (
        <AppLayout>
            <div>
              {images.map((image) => (
                        <div key={image.id} className="flex flex-col items-center justify-center">
                            <img src={image.content} alt="" width={500} height={400} />
                            <p className="mt-5 font-black">{image.name}</p>
                        </div>
                    ))}
            </div>
        </AppLayout>
    );
}
