import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/Home"
import LoginPage from "./pages/Login"
import RegistrationPage from "./pages/Registration"
import ProtectedRoutes from "./routes/ProtectedRoutes"
import ContentHome from "./components/ContentHome"
import Payment from "./pages/Payment"
import TopupPage from "./pages/Topup"
import TransactionPage from "./pages/Transaction"
import AccountPage from "./pages/Account"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <HomePage />,
        path: "/",
        children: [
          {
            path: "/",
            element: <ContentHome />,
            index: true
          },
          {
            path: "/topup",
            element: <TopupPage />,
          },
          {
            path: "/transaction",
            element: <TransactionPage />,
          },
          {
            path: "/payment/:serviceCode",
            element: <Payment />,
          }
        ]
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
    ]
  },
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
