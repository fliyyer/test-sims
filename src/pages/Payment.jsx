import { useState } from 'react';
import { MdOutlineMoney } from "react-icons/md";
import Listrik from '../assets/icons/Listrik.png';
import TextInput from '../components/TextInput';

const Payment = () => {
    const [amount, setAmount] = useState('');

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Nominal Pembayaran:', amount);
        setAmount('');
    };

    return (
        <section>
            <p className='text-lg text-secondary'>Pembayaran</p>
            <div className='flex gap-4 items-center'>
                <img src={Listrik} alt="Listrik" className='w-10' />
                <p className='text-lg font-semibold'>Listrik Prabayar</p>
            </div>
            <form onSubmit={handleSubmit} className='mt-4'>
                <TextInput
                    type="text"
                    icon={MdOutlineMoney}
                    inputMode='numeric'
                    pattern='[0-9]*'
                    placeholder="Nominal"
                    value={amount}
                    onChange={handleAmountChange}
                    required />
                <button
                    type="submit"
                    className='mt-6 bg-primary w-full text-white px-4 py-3 rounded-md hover:bg-red-600'
                >
                    Bayar
                </button>
            </form>
        </section>
    );
}

export default Payment;
