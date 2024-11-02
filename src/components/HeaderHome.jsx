import React, { useState } from 'react';
import Photo from '../assets/icons/Profile Photo.png';
import Background from '../assets/images/Background Saldo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const HeaderHome = () => {
    const [isBalanceVisible, setIsBalanceVisible] = useState(false);

    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    };

    return (
        <div className="py-4 w-full flex">
            {/* Profile Section */}
            <div className="flex-1 w-2/5 flex flex-col items-start">
                <img src={Photo} alt="Profile Photo" />
                <p className="text-secondary text-lg mt-4">Selamat Datang,</p>
                <p className="text-4xl font-semibold">Rahmat Hidayat</p>
            </div>
            {/* Info Saldo Section */}
            <div
                className="flex-1 p-5 w-3/5 text-white rounded-2xl flex flex-col items-start ml-4"
                style={{ backgroundImage: `url(${Background})` }}
            >
                <p>Saldo Anda</p>
                <p className='text-4xl font-medium my-3'>{isBalanceVisible ? 'Rp. 10.000' : '********'}</p>
                <div className='bg-[#F13B2F] max-w-60 mt-1 flex items-center justify-between rounded'>
                    <p className="cursor-pointer text-sm flex items-center gap-3" onClick={toggleBalanceVisibility}>
                        Lihat Saldo {isBalanceVisible ? <FaEyeSlash /> : <FaEye />}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HeaderHome;
