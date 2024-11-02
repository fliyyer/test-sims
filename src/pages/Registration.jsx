import { useState } from 'react';
import PasswordInput from '../components/PasswordInput';
import TextInput from '../components/TextInput';
import { FaAt } from 'react-icons/fa6';
import AuthLayout from '../layouts/AuthLayout';
import { register } from '../api/authService';
import ErrorNotify from '../components/ErrorNotify';

const RegistrationPage = () => {
    const [formRegist, setformRegist] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirmPassword: ''
    });

    const [notify, setNotify] = useState({
        error: '',
        success: '',
        showErrorNotify: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformRegist(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await register(formRegist);
            setNotify({
                error: response.status === 0 ? '' : response.message,
                success: response.status === 0 ? 'Registrasi berhasil! Silahkan login.' : '',
                showErrorNotify: response.status !== 0
            });
        } catch (error) {
            setNotify({
                error: error.message || 'Terjadi kesalahan saat registrasi',
                success: '',
                showErrorNotify: true
            });
        }
    };


    return (
        <AuthLayout title="Lengkapi data untuk membuat akun">
            <form className="space-y-4" onSubmit={handleSubmit}>
                <TextInput
                    name="email"
                    type="email"
                    placeholder="Masukan email anda"
                    icon={FaAt}
                    value={formRegist.email}
                    onChange={handleChange}
                    required
                />
                <TextInput
                    name="first_name"
                    type="text"
                    placeholder="Nama depan"
                    icon={FaAt}
                    value={formRegist.first_name}
                    onChange={handleChange}
                    required
                />
                <TextInput
                    name="last_name"
                    type="text"
                    placeholder="Nama belakang"
                    icon={FaAt}
                    value={formRegist.last_name}
                    onChange={handleChange}
                    required
                />
                <PasswordInput
                    name="password"
                    placeholder="Buat password"
                    value={formRegist.password}
                    onChange={handleChange}
                    required
                />
                <PasswordInput
                    name="confirmPassword"
                    placeholder="Konfirmasi password"
                    value={formRegist.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-primary text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                    Registrasi
                </button>
                {notify.success && <p className="text-green-500 text-sm text-center">{notify.success}</p>}
                <p className='text-center text-sm text-gray-400'>
                    Sudah punya akun? <span className="text-primary cursor-pointer">Login disini</span>
                </p>
            </form>
            <ErrorNotify
                message={notify.error}
                show={notify.showErrorNotify}
                onClose={() => setNotify(prev => ({ ...prev, showErrorNotify: false }))} />
        </AuthLayout>
    );
};

export default RegistrationPage;
