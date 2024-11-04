import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../assets/icons/Logo.png';

export default function Navbar() {
    const [navbar, setNavbar] = useState(false);

    return (
        <nav className="w-full border-gray-200 border-b-[2px] py-2">
            <div className="justify-between px-4 md:px-0 mx-auto lg:max-w-7xl md:items-center md:flex ">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <NavLink to='/' className="flex items-center gap-2">
                            <img src={Logo} alt="Logo" />
                            <span className='text-2xl text-secondary font-bold'>SIMS PPOB</span>
                        </NavLink>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <FaTimes className="size-6" />
                                ) : (
                                    <FaBars className="size-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <ul className="items-center text-center md:text-justify justify-center space-y-3 md:flex md:space-x-12 md:space-y-0">
                            <li className="text-gray-600 hover:text-blue-600">
                                <NavLink
                                    to='/topup'
                                    className={({ isActive }) =>
                                        isActive ? 'text-primary font-semibold' : 'text-secondary'
                                    }
                                >
                                    Top Up
                                </NavLink>
                            </li>
                            <li className="text-gray-600 hover:text-blue-600">
                                <NavLink
                                    to='/transaction'
                                    className={({ isActive }) =>
                                        isActive ? 'text-primary font-semibold' : 'text-secondary'
                                    }
                                >
                                    Transaction
                                </NavLink>
                            </li>
                            <li className="text-gray-600 hover:text-blue-600">
                                <NavLink
                                    to='/account'
                                    className={({ isActive }) =>
                                        isActive ? 'text-primary font-semibold' : 'text-secondary'
                                    }
                                >
                                    Akun
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}