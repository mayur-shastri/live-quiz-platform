import { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { instance as configuredAxios } from '../../../../axiosConfig';
import QuizContext from '../../Context Provider/QuizContext';

export default function ImageUploadButton({ slide, user_id }) {

    const { setSlides } = useContext(QuizContext);

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(slide.imageUrl); //set to loading animation

    const handleFileChange = async (e) => {
        setSelectedFile(e.target.files[0]);
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        const response = await configuredAxios.post(`${user_id}/${slide.id}/upload-image`,
            formData,
        );
        if(!response.data.imageUrl) return alert('Error uploading image'); // replace alert with flash message
        setPreview(response.data.imageUrl);
        const slideId = slide.id;
        setSlides((currentSlides) => {
            return currentSlides.map((s) => {
                if (s.id === slideId) {
                    console.log(response.data.imageUrl);
                    return { ...s, imageUrl: response.data.imageUrl };
                } else{
                    return s;
                }
            });
        });
    }

    const onClick = () => {
        setPreview(null);
        setTimeout(() => {
            setShowButton(false);
        }, 1000);
    }

    const onDelete = async () => {
        // delete from cloudinary logic...
        const res = await configuredAxios.delete(`/${user_id}/${slide.id}/delete-image`);
        if(res.data.message !== 'Image deleted successfully'){
            return alert('Error deleting image'); // replace alert with flash message
        }
        const slideId = slide.id;
        setSlides((currentSlides) => {
            return currentSlides.map((s) => {
                if (s.id === slideId) {
                    return { ...s, imageUrl: null };
                } else{
                    return s;
                }
            });
        });
        setPreview(null);
    }

    return (
        <div className="flex flex-col items-center justify-center bg-gray-50 p-4">
            {
                !slide.imageUrl &&
                <label
                    className="py-2 px-4 bg-primary text-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    htmlFor="fileUpload"
                    onClick={onClick}
                >
                    Choose File
                </label>
            }
            <input
                id="fileUpload"
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={handleFileChange}
                className="hidden"
            />
            {
                preview || slide.imageUrl ?
                <div className='flex flex-row justify-between w-full mt-1 border rounded-md border-gray-300 items-center'>
                    <img src={preview} alt="preview" className="m-1 border w-16 h-16 object-cover" />
                    <IconButton aria-label="" onClick={onDelete}>
                        <DeleteOutlineIcon sx={{ color: "red" }} />
                    </IconButton>
                </div>
                : null
            }
        </div>
    );
}