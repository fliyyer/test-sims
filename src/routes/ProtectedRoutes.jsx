import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/token";

const ProtectedRoutes = () => {
	const user = getToken();

	return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;