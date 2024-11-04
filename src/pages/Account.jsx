import { Fragment, useState } from 'react';
import Navbar from '../components/Navbar';
import PhotoProfile from '../assets/icons/Profile Photo.png';
import TextInput from '../components/TextInput';
import { FaAt, FaUser } from 'react-icons/fa6';
import { useUser } from '../contexts/UserContext';
import { updateProfileImage, updateUserProfile } from '../api/user';
import { FaPen } from 'react-icons/fa';
import { ErrorNotify, SuccessNotify } from '../components/Notification';
import useNotification from '../hooks/useNotification';
import { useNavigate } from 'react-router-dom';
import { deleteToken } from '../utils/token';
import MetaTag from '../layouts/MetaTag';

const AccountPage = ({ token }) => {
    const { user, loading } = useUser();
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();
    const [users, setUsers] = useState({
        firstName: user?.first_name || '',
        lastName: user?.last_name || '',
        email: user?.email || '',
        profileImage: user?.profile_image || PhotoProfile,
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(users.profileImage);
    const [imageFileSizeValid, setImageFileSizeValid] = useState(true);

    const handleEditToggle = () => {
        setEditing(!editing);
        if (editing) {
            handleSubmit();
        }
    };

    const { notification, notify } = useNotification();
    const handleSubmit = async () => {
        try {
            await updateUserProfile(token, users.firstName, users.lastName);
            if (imageFile) {
                const uploadResponse = await updateProfileImage(imageFile);
                if (uploadResponse && uploadResponse.data) {
                    setUsers((prev) => ({ ...prev, profileImage: uploadResponse.data.profile_image }));
                    setImagePreview(uploadResponse.data.profile_image);
                }
            }
            setEditing(false);
            notify('Profile updated successfully!', 'success');
        } catch (error) {
            console.error("Error saving profile:", error);
            notify(error.message || 'An error occurred while updating the profile.', 'error');
        }
    };




    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size <= 100 * 1024 && (file.type === 'image/jpeg' || file.type === 'image/png')) {
                setImageFileSizeValid(true);
                setImageFile(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
                console.log(file);
            } else {
                setImageFileSizeValid(false);
                alert("Only JPEG and PNG formats under 100KB are allowed.");
            }
        } else {
            setImageFile(null);
        }
    };

    const handleLogout = () => {
        deleteToken();
        navigate('/login');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Fragment>
            <MetaTag title={`Account | ${users.firstName}`} description="Manage your account settings, update profile information, and more." />
            <Navbar />
            <main className="w-full max-w-7xl mx-auto flex flex-col">
                <div className="flex flex-col items-center max-w-3xl py-6 w-full mx-auto">
                    <div className='relative'>
                        <img
                            src={imagePreview}
                            alt="Profile Photo"
                            className='size-28 rounded-full'
                        />
                        {editing && (
                            <label className="absolute bottom-0 right-0 cursor-pointer">
                                <div className='bg-white p-2 border border-gray-300 rounded-full'>
                                    <FaPen className="text-gray-600" />
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                        )}
                    </div>
                    <h1 className='text-secondary text-xl font-semibold mt-3'>
                        {users.firstName} {users.lastName}
                    </h1>
                    <div className="w-full mt-4">
                        <div className='flex flex-col gap-2'>
                            <TextInput
                                readOnly={!editing}
                                label="Email"
                                icon={FaAt}
                                type="email"
                                placeholder="Email"
                                defaultValue={users.email}
                            />
                            <TextInput
                                readOnly={!editing}
                                label="Name Depan"
                                icon={FaUser}
                                type="text"
                                placeholder="Name Depan"
                                defaultValue={users.firstName}
                                onChange={(e) => setUsers({ ...users, firstName: e.target.value })}
                            />
                            <TextInput
                                label="Name Belakang"
                                icon={FaUser}
                                type="text"
                                placeholder="Name Belakang"
                                defaultValue={users.lastName}
                                readOnly={!editing}
                                onChange={(e) => setUsers({ ...users, lastName: e.target.value })}
                            />
                            <button
                                onClick={handleEditToggle}
                                className='bg-primary text-white py-3 mb-2 text-sm font-medium rounded hover:bg-red-700'>
                                {editing ? 'Simpan' : 'Edit Profile'}
                            </button>
                            {!editing && (
                                <button onClick={handleLogout} className='text-primary border border-inline border-primary py-[10px] text-sm font-medium rounded'>Logout</button>
                            )}
                            {!imageFileSizeValid && <p className="text-red-500 text-sm">File size should be less than 100KB.</p>}
                        </div>
                    </div>
                    <ErrorNotify
                        message={notification.show && notification.type === 'error' ? notification.message : ''}
                        show={notification.show && notification.type === 'error'}
                    />
                    <SuccessNotify
                        message={notification.show && notification.type === 'success' ? notification.message : ''}
                        show={notification.show && notification.type === 'success'}
                    />
                </div>
            </main>
        </Fragment>
    );
}

export default AccountPage;
