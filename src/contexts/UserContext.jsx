import { createContext, useContext, useEffect, useState } from 'react';
import { getBalance, getUser } from '../api/user';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getUser();
                if (response.success === false) {
                    console.error(response.message);
                    return;
                }
                setUser(response.data);
                const token = response.data.token;
                const balance = await getBalance(token);
                setBalance(balance.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }));
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, balance, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

