import { useState } from 'react';

export default function ImageUploadButton() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
    }

    const onClick = ()=>{
        setPreview(null);
    }

    return (
        <div className="flex flex-col items-center justify-center bg-gray-50 p-4">
            <label 
                className="py-2 px-4 bg-primary text-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                htmlFor="fileUpload"
                onClick={onClick}
            >
                Choose File
            </label>
            <input 
                id="fileUpload"
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={handleFileChange} 
                className="hidden"
            />
            {preview && <img src={preview} alt="preview" className="mt-4 w-32 h-32 object-cover"/>}
        </div>
    );
}