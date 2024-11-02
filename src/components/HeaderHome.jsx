import { useEffect, useState } from 'react';
import Photo from '../assets/icons/Profile Photo.png';
import Background from '../assets/images/Background Saldo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { getBalance, getUser } from '../api/user';

const HeaderHome = () => {
    const [isBalanceVisible, setIsBalanceVisible] = useState(false);
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);

    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getUser();
                if (response.success === false) {
                    console.error(response.message);
                    return;
                }
                const token = response.data.token;
                setUser(response.data);
                const balance = await getBalance(token);
                setBalance(balance);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <header className="py-4 mt-8 w-full flex flex-col md:flex-row">
            <div className="w-2/5 flex-1 flex flex-col items-start">
                <img src={Photo} alt="Profile Photo" />
                <p className="text-secondary text-lg mt-4">Selamat Datang,</p>
                <p className="text-4xl font-semibold">{user.first_name} {user.last_name}</p>
            </div>
            <div
                className="p-5 w-[57%] text-white rounded-2xl flex flex-col items-start ml-4"
                style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover' }}
            >
                <p className='text-lg'>Saldo Anda</p>
                <p className='text-5xl font-medium my-3'>{isBalanceVisible ? `Rp. ${balance.toLocaleString()}` : '********'}</p>
                <div className='bg-[#F13B2F] max-w-60 p-1 flex items-center justify-between rounded'>
                    <p className="cursor-pointer text-sm flex items-center gap-3" onClick={toggleBalanceVisibility}>
                        Lihat Saldo {isBalanceVisible ? <FaEyeSlash /> : <FaEye />}
                    </p>
                </div>
            </div>
        </header>
    );
}

export default HeaderHome;
