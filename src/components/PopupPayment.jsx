import Logo from '../assets/icons/Logo.png';
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PopupPayment = ({ service, amount, paymentStatus, onConfirm, onCancel, type }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleConfirm = () => {
        setLoading(true);
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 10;
            });
        }, 1500);

        setTimeout(() => {
            onConfirm();
            setLoading(false);
            clearInterval(interval);
        }, 1500);
    };

    const handleBackToHome = () => {
        navigate('/');
        window.location.reload();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 relative rounded-lg shadow-lg text-center w-[370px]">
                {loading && (
                    <div className="w-[300px] absolute bottom-1 bg-gray-200 rounded-full h-1 left-1/2 transform -translate-x-1/2">
                        <div className="bg-primary h-1 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                    </div>
                )}
                {paymentStatus === null && (
                    <>
                        <img src={Logo} alt={service.title} className="mx-auto w-16 mb-4" />
                        <p className="text-lg font-medium text-secondary mt-4">
                            {type === 'topup'
                                ? 'Anda yakin untuk Top Up sebesar'
                                : `Beli ${service.title} senilai`}
                        </p>

                        <p className="text-3xl text-secondary font-bold mt-2">
                            Rp{amount.toLocaleString('id-ID')} ?
                        </p>
                        <div className="flex flex-col mt-5 space-y-4">
                            <button
                                onClick={handleConfirm}
                                className="text-primary text-base font-medium px-4 py-2 rounded-md hover:text-red-600"
                            >
                                {type === 'topup' ? 'Ya, Lanjutkan Top Up' : 'Ya, Lanjutkan Bayar'}
                            </button>
                            <button
                                onClick={onCancel}
                                className="text-gray-500 font-medium px-4 py-2"
                            >
                                Batalkan
                            </button>
                        </div>
                    </>
                )}
                {paymentStatus === "success" && (
                    <div className="flex flex-col items-center">
                        <div className="bg-green-500 p-3 flex items-center rounded-full">
                            <FaCheck className="text-white text-3xl" />
                        </div>
                        <p className="text-lg font-medium text-secondary mt-4">
                            {type === 'topup'
                                ? 'Top Up sebesarr'
                                : `Pembayaran ${service.title} senilai`}
                        </p>
                        <p className="text-3xl text-secondary font-bold my-2">Rp{amount.toLocaleString('id-ID')}</p>
                        <span>berhasil</span>
                        <button
                            onClick={handleBackToHome}
                            className="mt-5 text-primary font-medium px-4 py-2 rounded-md hover:text-red-600"
                        >
                            Kembali ke Beranda
                        </button>
                    </div>
                )}
                {paymentStatus === "failure" && (
                    <div className="flex flex-col items-center">
                        <div className="bg-red-500 p-3 flex items-center rounded-full">
                            <IoMdClose className="text-white text-3xl" />
                        </div>
                        <p className="text-lg font-medium text-secondary mt-4">
                            {type === 'topup' ? 'Top Up sebesar' : 'Pembayaran '}
                            <span className='lowercase'>{service.title}</span> sebesar
                        </p>
                        <p className="text-3xl text-secondary font-bold my-2">Rp{amount.toLocaleString('id-ID')}</p>
                        <span>gagal</span>
                        <button
                            onClick={handleBackToHome}
                            className="mt-5 text-primary font-medium px-4 py-2 rounded-md hover:text-red-600"
                        >
                            Kembali ke Beranda
                        </button>
                    </div>
                )}
            </div>
        </div >
    );
};

export default PopupPayment;
