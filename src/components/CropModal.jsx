import { useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { FaCheck, FaTimes } from 'react-icons/fa';

const CropModal = ({ imagePreview, onClose, onCrop }) => {
    const editorRef = useRef(null);

    const handleCrop = () => {
        if (editorRef.current) {
            const canvas = editorRef.current.getImage();
            canvas.toBlob((blob) => {
                const newFile = new File([blob], "profile.jpg", { type: "image/jpeg" });
                const reader = new FileReader();
                reader.onloadend = () => {
                    onCrop(reader.result); // Call the onCrop function passed as a prop
                };
                reader.readAsDataURL(newFile);
            }, "image/jpeg");
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-2">Crop Image</h2>
                <AvatarEditor
                    ref={editorRef}
                    image={imagePreview}
                    width={300}
                    height={300}
                    border={50}
                    scale={1.2}
                    className="cropper"
                />
                <div className="flex justify-end mt-4">
                    <button onClick={handleCrop} className="bg-green-500 text-white px-4 py-2 rounded flex items-center mr-2">
                        <FaCheck className="mr-1" /> Confirm
                    </button>
                    <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded flex items-center">
                        <FaTimes className="mr-1" /> Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CropModal;
