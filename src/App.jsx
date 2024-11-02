import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/Home"
import LoginPage from "./pages/Login"
import RegistrationPage from "./pages/Registration"
import ProtectedRoutes from "./routes/ProtectedRoutes"
import ContentHome from "./components/ContentHome"
import Payment from "./pages/Payment"

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
            path: "/pbb",
            element: <Payment />,
          }
        ]
      }
    ]
  },
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
