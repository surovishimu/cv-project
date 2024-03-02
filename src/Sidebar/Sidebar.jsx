import { NavLink } from "react-router-dom";
import './Style.css'
const Sidebar = () => {
    return (
        <div className="w-1/5 min-h-full  bg-gray-400 menu">
            <NavLink
                to="/"
                activeClassName="active"
                className="flex items-center text-white px-7 py-3 mt-2 text-sm font-semibold"
            >
                Create CV
            </NavLink>

            <NavLink
                to="allpdf"
                activeClassName="active"
                className="flex items-center text-white px-7 py-3 mt-2 text-sm font-semibold"
            >
                All CV
            </NavLink>
            <NavLink
                to="pdf"
                activeClassName="active"
                className="flex items-center text-white px-7 py-3 mt-2 text-sm font-semibold"
            >
                Download Last pdf
            </NavLink>
        </div>
    );
};

export default Sidebar;
