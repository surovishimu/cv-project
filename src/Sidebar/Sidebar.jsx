import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-1/5 min-h-full md:min-h-screen bg-gray-400 shadow-xl menu ">
            <NavLink
                to="/"
                className={({ isActive, isExact, isPartiallyCurrent, isPending }) => {
                    return isPending
                        ? 'pending flex items-center text-white p-3 lg:p-7 text-sm  font-semibold'
                        : isActive || isExact || isPartiallyCurrent
                            ? 'active flex items-center text-black bg-customRed lg:p-7 p-3 text-sm  font-semibold'
                            : 'flex items-center text-white hover:text-black hover:bg-white p-3 lg:p-7 text-sm  font-semibold';
                }}
            >
                CV Form
            </NavLink>
            <NavLink
                to="/pdf"
                className={({ isActive, isExact, isPartiallyCurrent, isPending }) => {
                    return isPending
                        ? 'pending flex items-center text-white p-3 lg:p-7 text-sm  font-semibold'
                        : isActive || isExact || isPartiallyCurrent
                            ? 'active flex items-center text-black bg-customRed lg:p-7 p-3 text-sm  font-semibold'
                            : 'flex items-center text-white hover:text-black hover:bg-white p-3 lg:p-7 text-sm  font-semibold';
                }}
            >
                Download pdf
            </NavLink>
        </div>
    );
};

export default Sidebar;
