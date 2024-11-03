import { NavLink } from 'react-router-dom';
import Logo from '../assets/icons/Logo.png';

const Navbar = () => {
    return (
        <nav className='w-full border-gray-200 border-b-[2px] py-7'>
            <div className='flex max-w-7xl mx-auto justify-between items-center'>
                <NavLink to='/' className="flex items-center gap-2">
                    <img src={Logo} alt="Logo" />
                    <span className='text-2xl text-secondary font-bold'>SIMS PPOB</span>
                </NavLink>
                <ul className="flex font-medium gap-12">
                    <NavLink
                        to='/topup'
                        className={({ isActive }) =>
                            isActive ? 'text-primary font-semibold' : 'text-secondary'
                        }
                    >
                        Top Up
                    </NavLink>
                    <NavLink
                        to='/transaction'
                        className={({ isActive }) =>
                            isActive ? 'text-primary font-semibold' : 'text-secondary'
                        }
                    >
                        Transaction
                    </NavLink>
                    <NavLink
                        to='/account'
                        className={({ isActive }) =>
                            isActive ? 'text-primary font-semibold' : 'text-secondary'
                        }
                    >
                        Akun
                    </NavLink>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
