import Background from '../assets/images/Illustrasi Login.png';
import Logo from '../assets/icons/Logo.png';

const AuthLayout = ({ title, children }) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-full md:w-[45%] flex flex-col justify-center items-center p-8 bg-gray-100">
                <div className='flex flex-col items-center'>
                    <div className='flex items-center gap-2'>
                        <img src={Logo} alt="Logo" />
                        <span className='text-2xl text-secondary font-bold'>SIMS PPOB</span>
                    </div>
                    <p className="text-secondary text-3xl font-semibold max-w-sm text-center mt-6">{title}</p>
                </div>
                <div className="w-full mx-auto mt-8 max-w-lg">
                    {children}
                </div>
            </div>
            <div className="hidden md:flex w-[55%] bg-[#fff1f0] items-center justify-center">
                <img src={Background} alt="Background" className="object-cover w-[70%]" />
            </div>
        </div>
    );
};

export default AuthLayout;
