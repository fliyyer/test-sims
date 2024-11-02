import { GET } from "./apiHandler";

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