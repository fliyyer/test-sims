import { useEffect, useState } from 'react';
import { MdOutlineMoney } from "react-icons/md";
import TextInput from '../components/TextInput';
import { useParams } from 'react-router-dom';
import { getBalance, getServices, submitTransaction } from '../api/user';
import PopupPayment from '../components/PopupPayment';
import MetaTag from '../layouts/MetaTag';
import SkeletonLoader from '../components/SkeletonLoader';

const Payment = ({ token }) => {
    const { serviceCode } = useParams();
    const [service, setService] = useState(null);
    const [amount, setAmount] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const dataService = async () => {
            try {
                setLoading(true);
                const services = await getServices();
                const selectedService = services.find(s => s.route === `/${serviceCode}`);
                setService(selectedService);
                setAmount(selectedService.tariff);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        dataService();
    }, [serviceCode]);

    const handleConfirmPayment = async () => {
        const service_code = serviceCode.toUpperCase();
        try {
            const balance = await getBalance(token);
            if (balance >= amount) {
                const response = await submitTransaction(service_code, token);
                console.log(`Transaksi Berhasil! Invoice: ${response.invoice_number}`);
                setPaymentStatus("success");
            } else {
                setPaymentStatus("failure");
            }
        } catch (error) {
            console.error("Payment failed:", error);
            setPaymentStatus("failure");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowPopup(true);
    };

    return (
        <section>
            <MetaTag title={`Pembayaran ${service?.title || 'Layanan'}`} description={`Pembayaran ${service?.title || 'Layanan'}`} />
            <p className='text-lg text-secondary'>Pembayaran</p>

            <div className='flex gap-4 items-center'>
                {loading ? (
                    <SkeletonLoader type="circle" width={40} height={40} />
                ) : (
                    <img src={service.icon} alt={service.title} className='w-10' />
                )}
                {loading ? (
                    <SkeletonLoader type="text" width={100} height={24} />
                ) : (
                    <p className='text-lg font-semibold'>{service.title}</p>
                )}
            </div>

            <form onSubmit={handleSubmit} className='mt-4'>
                {loading ? (
                    <SkeletonLoader type="text" width="100%" height={48} />
                ) : (
                    <TextInput
                        type="text"
                        icon={MdOutlineMoney}
                        inputMode='numeric'
                        pattern='[0-9]*'
                        placeholder="Nominal"
                        defaultValue={amount}
                        readOnly
                        required
                    />
                )}
                <button
                    type="submit"
                    className='mt-6 bg-primary w-full text-white px-4 py-3 rounded-md hover:bg-red-600'
                    disabled={loading}
                >
                    Bayar
                </button>
            </form>

            {showPopup && (
                <PopupPayment
                    service={service}
                    amount={amount}
                    paymentStatus={paymentStatus}
                    onConfirm={handleConfirmPayment}
                    onCancel={() => {
                        setShowPopup(false);
                        setPaymentStatus(null);
                    }}
                />
            )}
        </section>
    );
}

export default Payment;
