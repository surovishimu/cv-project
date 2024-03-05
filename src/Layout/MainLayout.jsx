import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";



const MainLayout = () => {
    return (
        <div className="flex font-custom w-full">
            <Sidebar></Sidebar>

            <Outlet></Outlet>

        </div>
    );
};

export default MainLayout;