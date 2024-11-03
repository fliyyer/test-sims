import { Fragment, useState } from 'react';
import TextInput from '../components/TextInput';
import { MdOutlineMoney } from 'react-icons/md';
import { topup } from '../api/user';
import PopupPayment from '../components/PopupPayment';

const TopupPage = ({ token }) => {
    const [amount, setAmount] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);

    const handleAmountClick = (value) => {
        setAmount(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowPopup(true);
    };

    const handleConfirmPayment = async () => {
        try {
            const result = await topup(amount, token);
            setPaymentStatus("success");
            if (result.status === 0) {
                setPaymentStatus("success");
            }
        } catch (error) {
            setPaymentStatus("failure");
            console.error(error);
        }
    };

    return (
        <Fragment>
            <main className="max-w-7xl w-full my-10 mx-auto">
                <p className="text-xl ">Silahkan Masukan</p>
                <p className="text-3xl font-bold mt-1">Nominal Top Up</p>
                <section className='flex my-10 gap-8 items-center'>
                    <form className='w-2/3' onSubmit={handleSubmit}>
                        <TextInput
                            type="number"
                            icon={MdOutlineMoney}
                            inputMode='numeric'
                            placeholder="Nominal"
                            value={amount.toLocaleString('id-ID')}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className={`mt-6 w-full text-white px-4 py-3 rounded-md ${amount ? 'bg-primary hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed'}`}
                            disabled={!amount}
                        >
                            Bayar
                        </button>
                    </form>
                    <div className='w-1/3 grid grid-cols-3 gap-4'>
                        {[10000, 20000, 50000, 100000, 250000, 500000].map(value => (
                            <button
                                key={value}
                                onClick={() => handleAmountClick(value)}
                                className='border flex items-center justify-center border-gray-300 px-8 py-3 rounded-sm hover:bg-gray-200'
                            >
                                Rp{value.toLocaleString('id-ID')}
                            </button>
                        ))}
                    </div>
                </section>
            </main>
            {showPopup && (
                <PopupPayment
                    service={{ title: 'Top Up' }}
                    amount={amount}
                    paymentStatus={paymentStatus}
                    onConfirm={handleConfirmPayment}
                    onCancel={() => setShowPopup(false)}
                    type="topup"
                />
            )}
        </Fragment>
    );
};

export default TopupPage;
