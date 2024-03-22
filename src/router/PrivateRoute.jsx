import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { RingLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    console.log(user)
    if (loading) {
        return (
            <div className="flex justify-center items-center w-4/5 h-screen">
                <RingLoader color={'#B0272E'} loading={loading} size={150} />
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate to={'/login'} replace />;
};

export default PrivateRoute;
