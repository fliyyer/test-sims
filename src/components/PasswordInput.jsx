import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdLockOutline } from "react-icons/md";

const PasswordInput = ({ placeholder, ...props }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="relative">
            <MdLockOutline className="w-5 h-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" />
            <input
                type={passwordVisible ? "text" : "password"}
                placeholder={placeholder}
                className="w-full pl-10 pr-10 p-4 border text-secondary text-sm border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                {...props}
            />
            <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
            >
                {passwordVisible ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
            </div>
        </div>
    );
};

export default PasswordInput;
