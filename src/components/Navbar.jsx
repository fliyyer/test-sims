import { Link } from 'react-router-dom'
import Logo from '../assets/icons/Logo.png'
const Navbar = () => {
    return (
        <nav className='w-full border-gray-200 border-b-[2px] py-7'>
            <div className='flex max-w-7xl mx-auto justify-between items-center'>
                <Link to='/' className="flex items-center gap-2">
                    <img src={Logo} alt="Logo" />
                    <span className='text-2xl text-secondary font-bold'>SIMS PPOB</span>
                </Link>
                <ul className="flex gap-12">
                    <li>Top Up</li>
                    <li>Transaction</li>
                    <li>Akun</li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
