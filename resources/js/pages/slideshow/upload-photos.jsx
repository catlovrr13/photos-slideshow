import AppLayout from '@/layouts/app-layout';
import { Reorder, useDragControls } from 'motion/react';
import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['png', 'jpeg', 'jpg', 'heic', 'svg'];

export default function UploadPhotos() {
    const [files, setFiles] = useState([]);
    const controls = useDragControls();

    const fileNameToCaptions = (fileName) => {
        let caption = fileName
            .replaceAll(/-/g, ' ')
            .replaceAll(/_/g, ' ')
            .split(' ')
            .map((w) => w[0].toUpperCase() + w.slice(1))
            .join(' ');
        caption = caption.replace(/\.[^\/.]+$/, '');
        return caption;
    };

    useEffect(() => {
        if (!files.length) {
            if (localStorage.getItem('images-uploaded')) setFiles(JSON.parse(localStorage.getItem('images-uploaded')));
        } else {
            localStorage.setItem('images-uploaded', JSON.stringify(files));
        }
    }, [files]);

    const handleChange = (images) => {
        console.log(images);
        const temp = [...files];
        let finished = 0;
        for (let i = 0; i < images.length; i++) {
            const reader = new FileReader();
            reader.onloadend = () => {
                temp.push({
                    id: i,
                    name: fileNameToCaptions(images[i].name),
                    content: reader.result,
                });
                finished += 1;
                if (finished == images.length) setFiles(temp);
            };
            reader.readAsDataURL(images[i]);
        }
    };
    return (
        <AppLayout>
            <div className="m-10 max-w-screen">
                <p className="mb-3">Drag or Drop Photos Here !</p>
                <FileUploader
                    handleChange={handleChange}
                    multiple
                    required
                    hoverTitle="Drop Here!"
                    types={fileTypes}
                    uploadedLabel="Uploaded Successfully! Add more images?"
                    on
                />
            </div>
            <div className="m-3 flex flex-col gap-3">
                <p>Images uploaded:</p>
                <div className="m-2 flex w-300 flex-col items-center justify-center gap-5">
                    <Reorder.Group 
                    values={files} 
                    onReorder={setFiles} 
                    as="ul"
                    className="m-2 flex flex-col items-center justify-center gap-5" >
                        
                        {files.map((file) => (

                            <Reorder.Item 
                            key={file.id} 
                            value={file} 
                            dragListener={true} 
                            className='relative border border-gray-400 p-2 w-50 rounded-2xl'>

                                <div 
                                key={file.id} 
                                onPointerDown={(e) => controls.start(e)}
                                className="flex flex-col justify-center items-center" >
                                    <img src={file.content} width={50} height={50} />
                                    <p>{file.name}</p> 
                                </div>

                            </Reorder.Item>

                        ))}

                    </Reorder.Group>
                </div>
            </div>
        </AppLayout>
    );
}
