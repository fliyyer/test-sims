import { Fragment, useEffect, useState } from 'react';
import { getTransactionHistory } from '../api/user';

const TransactionPage = ({ token }) => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(10);
    const [selectedMonth, setSelectedMonth] = useState(0);

    useEffect(() => {
        const fetchTransactionHistory = async () => {
            try {
                const transactionData = await getTransactionHistory(token, 25);
                setTransactions(transactionData);
                setFilteredTransactions(transactionData.slice(0, visibleCount));
            } catch (error) {
                console.error("Error fetching transaction history:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactionHistory();
    }, [token, visibleCount]);

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
        setVisibleCount((prevCount) => prevCount + 10);
    };

    if (loading) return <p>Loading transactions...</p>;

    return (
        <Fragment>
            <main className="max-w-7xl w-full my-10 mx-auto">
                <p className="text-2xl font-medium">Semua Transaksi</p>

                {/* Month Filter Menu */}
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
                    {filteredTransactions.length > 0 ? (
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

                {filteredTransactions.length > 0 && visibleCount < transactions.length && (
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
