import { useState } from 'react';
import Photo from '../assets/icons/Profile Photo.png';
import Background from '../assets/images/Background Saldo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useUser } from '../contexts/UserContext';
import SkeletonLoader from './SkeletonLoader';

const HeaderHome = () => {
    const { user, balance, loading } = useUser();
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);

    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    };

    return (
        <header className="py-4 mt-8 w-full flex flex-col md:flex-row">
            <div className="w-2/5 flex-1 flex flex-col items-start">
                {loading ? (
                    <>
                        <SkeletonLoader type="circle" height={50} />
                        <SkeletonLoader type="text" count={1} height={20} width={150} className="mt-4" />
                        <SkeletonLoader type="text" count={1} height={30} width={200} className="mt-2" />
                    </>
                ) : (
                    <>
                        <img src={Photo} alt="Profile Photo" />
                        <p className="text-secondary text-lg mt-4">Selamat Datang,</p>
                        <p className="text-4xl font-semibold">{user.first_name} {user.last_name}</p>
                    </>
                )}
            </div>
            <div
                className="p-5 w-[57%] text-white rounded-2xl flex flex-col items-start ml-4"
                style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover' }}
            >
                {loading ? (
                    <>
                        <SkeletonLoader type="text" count={1} height={20} width={100} />
                        <SkeletonLoader type="text" count={1} height={40} width={150} className="my-3" />
                    </>
                ) : (
                    <>
                        <p className='text-lg'>Saldo Anda</p>
                        <p className='text-5xl font-medium my-3'>{isBalanceVisible ? `${balance}` : '********'}</p>
                        <div className='bg-[#F13B2F] max-w-60 p-1 flex items-center justify-between rounded'>
                            <p className="cursor-pointer text-sm flex items-center gap-3" onClick={toggleBalanceVisibility}>
                                Lihat Saldo {isBalanceVisible ? <FaEyeSlash /> : <FaEye />}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
}

export default HeaderHome;
