import { GET, POST } from "./apiHandler";

export const getUser = async () => {
    const response = await GET('profile'); 

    if (response.success === false) {
        throw new Error(response.message); 
    }

    return response;
};

export const getBanner = async () => {
    try {
        const response = await GET('banner');
        if (response.status === 0) {
            return response.data; // 
        } else {
            console.error(response.message);
            throw new Error(response.message); 
        }
    } catch (error) {
        console.error('Error fetching banners:', error);
        throw error; 
    }
};

export const getServices = async () => {
    try {
        const response = await GET('services');
        if (response.status === 0) {
            const serviceMenus = response.data.map(service => ({
                icon: service.service_icon,
                route: `/${service.service_code.toLowerCase()}`,
                title: service.service_name,
                tariff: service.service_tariff,
            }));
            return serviceMenus; 
        } else {
            console.error(response.message);
            throw new Error(response.message); 
        }
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error; 
    }
};

export const getBalance = async (token) => {
    try {
        const response = await GET('balance', {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        if (response.status === 0) {
            return response.data.balance; 
        } else {
            console.error(response.message);
            throw new Error(response.message);
        }
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw error; 
    }
};
export const submitTransaction = async (servieCode, token) => {
    try {
        const response = await POST(
            'transaction',
            {
                service_code: servieCode,
                transaction_type: "PAYMENT"
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (response.status === 0) {
            return response.data;
        } else {
            throw new Error(response.message || "Transaksi gagal.");
        }
    } catch (error) {
        console.error("Error in submitTransaction:", error);
        throw error;
    }
};

export const topup = async (amount, token) => {
    try {
        const response = await POST(
            'topup',
            {
                top_up_amount : amount
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (response.status === 0) {
            return response.data;
        } else {
            throw new Error(response.message || "Top Up failed.");
        }
    } catch (error) {
        console.error("Error in topup:", error);
        throw error;
    }
}

export const getTransactionHistory = async (token, limit) => {
    try {
        const queryParams = limit ? `?limit=${limit}` : ''; 
        const response = await GET(`transaction/history${queryParams}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });

        if (response.status === 0) {
            return response.data.records; 
        } else {
            throw new Error(response.message || "Failed to fetch transaction history.");
        }
    } catch (error) {
        console.error("Error fetching transaction history:", error);
        throw error;
    }
};