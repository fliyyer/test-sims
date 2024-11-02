import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/Home"
import LoginPage from "./pages/Login"
import RegistrationPage from "./pages/Registration"

const router = createBrowserRouter([
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

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
