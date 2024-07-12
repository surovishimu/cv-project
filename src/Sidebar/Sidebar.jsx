import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './Style.css'
const Sidebar = () => {
    const {
        user,
        handleLogout,
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        handleChangePassword,
        setPrevPassword,
        setNewPassword,
        prevPassword,
        newPassword,
        errorMessage
    } = useAuth();

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogoutClick = () => {
        handleLogout();
    };

    const handlePasswordChange = () => {
        handleOpenModal();
    };

    return (
        <div className="w-1/5 min-h-full bg-gray-400 menu ">
            <NavLink
                to="/"
                activeClassName="active"
                className="flex items-center text-white px-7 py-3 mt-2 text-sm font-semibold"
            >
                Create CV
            </NavLink>

            {user && (
                <NavLink
                    to="allpdf"
                    activeClassName="active"
                    className="flex items-center text-white px-7 py-3 mt-2 text-sm font-semibold"
                >
                    All CV
                </NavLink>
            )}
            {user && user.email === 'fabio.admin@email.com' && (
                <NavLink
                    to="archive"
                    activeClassName="active"
                    className="flex items-center text-white px-7 py-3 mt-2 text-sm font-semibold"
                >
                    Archive
                </NavLink>
            )}

            {
                !user && <NavLink
                    to="login"
                    activeClassName="active"
                    className="flex items-center text-white px-7 py-3 mt-2 text-sm font-semibold"
                >
                    Login
                </NavLink>
            }

            {user && (
                <div className="dropdown mt-5 ml-5 ">
                    <span className="username" onClick={toggleDropdown}>
                        Welcome, {user.username}
                        <span className="dropdown-icon">&#9662;</span>
                    </span>
                    {showDropdown && (
                        <div className="dropdown-content">
                            <button className='mb-2' onClick={handlePasswordChange}>Change Password</button>
                            <Link to={'/login'}> <button onClick={handleLogoutClick}>Logout</button></Link>
                        </div>
                    )}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-10">
                    <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
                        <div className="mb-4">
                            <label htmlFor="prevPassword" className="block text-gray-700 text-sm font-bold mb-2">
                                Previous Password
                            </label>
                            <input
                                type="password"
                                id="prevPassword"
                                name="prevPassword"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none "
                                placeholder="Enter your previous password"
                                value={prevPassword}
                                onChange={(e) => setPrevPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none "
                                placeholder="Enter your new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="button"
                            className="w-full  text-white py-2 px-4 rounded-lg    bg-red-600 hover:bg-red-700 focus:outline-none focus:bg-red-700"
                            onClick={handleChangePassword}
                        >
                            Change Password
                        </button>
                        <button
                            type="button"
                            className="mt-2 w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </button>
                        {errorMessage && (
                            <div className="text-red-500 px-7 py-1 mt-2 text-sm font-semibold">
                                {errorMessage}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
