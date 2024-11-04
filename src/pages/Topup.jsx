import { Fragment, useState } from 'react';
import TextInput from '../components/TextInput';
import { MdOutlineMoney } from 'react-icons/md';
import { topup } from '../api/user';
import PopupPayment from '../components/PopupPayment';
import MetaTag from '../layouts/MetaTag';

const TopupPage = ({ token }) => {
    const [amount, setAmount] = useState('');
    const [numericAmount, setNumericAmount] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [amountError, setAmountError] = useState(false);

    const handleAmountClick = (value) => {
        setNumericAmount(value);
        setAmount(value.toLocaleString('id-ID'));
        setAmountError(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (numericAmount < 10000 || numericAmount > 1000000) {
            setAmountError(true);
        } else {
            setShowPopup(true);
            setAmountError(false);
        }
    };

    const handleConfirmPayment = async () => {
        try {
            const result = await topup(numericAmount, token);
            setPaymentStatus("success");
            if (result.status === 0) {
                setPaymentStatus("success");
            }
        } catch (error) {
            setPaymentStatus("failure");
            console.error(error);
        }
    };

    const handleAmountChange = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '');
        const numericValue = Number(inputValue);
        setNumericAmount(numericValue);
        setAmount(numericValue.toLocaleString('id-ID'));
        setAmountError(false);
    };

    const isAmountValid = numericAmount >= 10000 && numericAmount <= 1000000;

    return (
        <Fragment>
            <MetaTag title="Top Up" description="Top Up SIMS PPOB" />
            <main className="max-w-7xl w-full my-10 mx-auto">
                <p className="text-xl">Silahkan Masukan</p>
                <p className="text-3xl font-bold mt-1">Nominal Top Up</p>
                <section className="flex my-10 gap-8 items-center">
                    <form className="w-2/3" onSubmit={handleSubmit}>
                        <TextInput
                            type="text"
                            icon={MdOutlineMoney}
                            inputMode="numeric"
                            placeholder="Masukkan nominal Top Up"
                            value={amount}
                            onChange={handleAmountChange}
                            required
                        />
                        {amountError && (
                            <p className="text-sm text-red-500 mt-2">
                                Minimal Rp10.000 dan maksimal Rp1.000.000
                            </p>
                        )}
                        <button
                            type="submit"
                            className={`mt-1 w-full text-white px-4 py-3 rounded-md ${isAmountValid ? 'bg-primary hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed'}`}
                            disabled={!isAmountValid}
                        >
                            Bayar
                        </button>
                    </form>
                    <div className="w-1/3 grid grid-cols-3 gap-4">
                        {[10000, 20000, 50000, 100000, 250000, 500000].map((value) => (
                            <button
                                key={value}
                                onClick={() => handleAmountClick(value)}
                                className="border flex items-center justify-center border-gray-300 px-8 py-3 rounded-sm hover:bg-gray-200"
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
