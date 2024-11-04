import { useState } from 'react';
import { FaAt } from 'react-icons/fa6';
import AuthLayout from '../layouts/AuthLayout';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import { login } from '../api/authService';
import { useNavigate } from 'react-router-dom';
import { ErrorNotify } from '../components/Notification';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: ''
    });
    const [notify, setNotify] = useState({
        error: '',
        success: '',
        showErrorNotify: false
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormLogin(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login(formLogin);
            navigate('/');
            setNotify({
                error: response.status === 0 ? '' : response.message,
                success: response.status === 0 ? 'Login Sukses' : '',
                showErrorNotify: response.status !== 0
            });
        } catch (error) {
            setNotify({
                error: error.message || 'Terjadi kesalahan saat login',
                success: '',
                showErrorNotify: true
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <AuthLayout title="Masuk ke akun Anda">
            <form className="space-y-4" onSubmit={handleSubmit}>
                <TextInput
                    name="email"
                    type="email"
                    placeholder="Masukan email anda"
                    icon={FaAt}
                    value={formLogin.email}
                    onChange={handleChange}
                    required
                />
                <PasswordInput
                    name="password"
                    placeholder="Masukan password"
                    value={formLogin.password}
                    onChange={handleChange}
                    required
                />
                <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full py-3 bg-primary text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                    {isLoading ? 'Login...' : 'Login'}
                </button>
                {notify.success && <p className="text-green-500 text-sm text-center">{notify.success}</p>}
                <p className='text-center text-sm text-gray-400'>
                    Belum punya akun? <span className="text-primary cursor-pointer">Daftar disini</span>
                </p>
            </form>
            <ErrorNotify
                message={notify.error}
                show={notify.showErrorNotify}
                onClose={() => setNotify(prev => ({ ...prev, showErrorNotify: false }))} />
        </AuthLayout>
    );
};

export default LoginPage;
