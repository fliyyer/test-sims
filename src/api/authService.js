import { POST } from "./apiHandler";
import Cookies from 'js-cookie';

export const register = async (register) => {
    if (register.password !== register.confirmPassword) {
        throw new Error('Password tidak cocok!');
    }

    const { email, first_name, last_name, password } = register;
    const registrationData = { email, first_name, last_name, password };
    
    return await POST('/registration', registrationData);
};

export const login = async (login) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(login.email)) {
        throw new Error('Parameter email tidak sesuai format');
    }
    if (login.password.length < 8) {
        throw new Error('Password minimal 8 karakter');
    }

    const response = await POST('/login', login);

    if (response.status === 0 && response.data && response.data.token) {
        Cookies.set('token', response.data.token, { expires: 1/2 }); 
    }

    return response; 
};

