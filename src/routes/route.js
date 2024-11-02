import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import RegistrationPage from "../pages/Registration";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/registration",
        element: <RegistrationPage />,
    },
])