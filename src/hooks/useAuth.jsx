import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import swal from 'sweetalert';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [prevPassword, setPrevPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(true);
    // Load user from localStorage on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false); // Set loading to false after fetching user
    }, []);

    // Set up automatic logout after 10 days
    useEffect(() => {
        let logoutTimer;
        if (user) {
            logoutTimer = setTimeout(() => {
                setUser(null); // Logout the user
                return <Navigate to="/" replace />; // Remove user from localStorage
            }, 10 * 24 * 60 * 60 * 1000); // 10 days in milliseconds
        }

        return () => clearTimeout(logoutTimer); // Clean up the timer on unmount or user change
    }, [user]);


    const handleLogin = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const user = await response.json();
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
                window.location.href = '/';
            } else {
                setErrorMessage('Invalid email or password');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleLogout = () => {
        setUser(null); // Reset user state to null
        localStorage.removeItem('user'); // Remove user from localStorage
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };



    const handleChangePassword = async () => {
        try {
            const response = await fetch(`http://localhost:5000/changePassword/${user._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prevPassword, newPassword }),
            });

            if (response.ok) {
                // Password changed successfully
                swal({
                    title: 'Password Changed',
                    text: 'Your password has been changed successfully!',
                    icon: 'success',
                });
                handleCloseModal();
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Failed to change password');
            }
        } catch (error) {
            setErrorMessage(error.message || 'Failed to change password');
        }
    };




    return {
        user,
        errorMessage,
        isModalOpen,
        prevPassword,
        newPassword,
        handleLogin,
        handleLogout,
        handleOpenModal,
        handleCloseModal,
        handleChangePassword,
        setPrevPassword,
        setNewPassword,
        loading
    };
};

export default useAuth;
