import { Fragment, useEffect, useState } from 'react';
import { getTransactionHistory } from '../api/user';
import MetaTag from '../layouts/MetaTag';
import SkeletonLoader from '../components/SkeletonLoader'; // Ensure to import the SkeletonLoader component

const TransactionPage = ({ token }) => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const fetchTransactionHistory = async (currentOffset) => {
            try {
                const transactionData = await getTransactionHistory(token, 5, currentOffset);
                setTransactions((prevTransaction) => [...prevTransaction, ...transactionData]);
                setFilteredTransactions((prevFiltered) => [...prevFiltered, ...transactionData]);
            } catch (error) {
                console.error("Error fetching transaction history:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactionHistory(offset);
    }, [token, offset]);

    const filterByMonth = (monthOffset) => {
        setSelectedMonth(monthOffset);
        const now = new Date();
        const startDate = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1);
        const endDate = new Date(now.getFullYear(), now.getMonth() - monthOffset + 1, 0);

        const filtered = transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.created_on);
            return transactionDate >= startDate && transactionDate <= endDate;
        });

        setFilteredTransactions(filtered.length > 0 ? filtered : []);
    };

    const loadMoreTransactions = () => {
        setOffset((prevOffset) => prevOffset + 5);
    };

    return (
        <Fragment>
            <MetaTag title="Transaksi" description="Riwayat Transaksi" />
            <main className="max-w-7xl w-full my-10 mx-auto">
                <p className="text-2xl font-medium">Semua Transaksi</p>
                <div className="flex space-x-4 mt-4">
                    {[...Array(6)].map((_, index) => {
                        const date = new Date();
                        date.setMonth(date.getMonth() - index);
                        const monthLabel = date.toLocaleDateString('id-ID', { month: 'long' });
                        return (
                            <button
                                key={index}
                                onClick={() => filterByMonth(index)}
                                className={`text-base font-medium ${selectedMonth === index ? 'text-secondary' : 'text-gray-400'
                                    } hover:text-secondary`}
                            >
                                {monthLabel}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-6">
                    {loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="flex justify-between items-start py-6 px-8 border-[1px] rounded-lg border-gray-300 mb-5">
                                <SkeletonLoader type="text" count={1} height={24} width={150} />
                                <SkeletonLoader type="text" count={1} height={24} width={200} />
                            </div>
                        ))
                    ) : filteredTransactions.length > 0 ? (
                        filteredTransactions.map((transaction, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-start py-6 px-8 border-[1px] rounded-lg border-gray-300 mb-5"
                            >
                                <div className="flex flex-col">
                                    <p className={`font-semibold text-2xl ${transaction.transaction_type === "TOPUP" ? 'text-green-500' : 'text-primary'}`}>
                                        {transaction.transaction_type === "TOPUP" ? `+ Rp${transaction.total_amount}` : `- Rp${transaction.total_amount}`}
                                    </p>
                                    <p className="text-gray-400 text-xs mt-2">
                                        {new Date(transaction.created_on).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })} <span>{new Date(transaction.created_on).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                                    </p>
                                </div>
                                <p className="text-secondary">{transaction.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center mt-16">Maaf, tidak ada histori transaksi bulan ini.</p>
                    )}
                </div>
                {filteredTransactions.length > 0 && (
                    <div className="text-center mt-6">
                        <button
                            onClick={loadMoreTransactions}
                            className="px-4 py-2 text-primary font-semibold hover:text-red-600"
                        >
                            Show more
                        </button>
                    </div>
                )}
            </main>
        </Fragment>
    );
};

export default TransactionPage;
