import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Loader from "./components/Loader"
import ErrorPage from "./components/ErrorPage"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import PrivateRoute from "./components/PrivateRout"
import Layout from "./Layout"
import Photos from "./pages/Photos"
import { Library } from "lucide-react"
import SideBarWrapper from "./components/SideBarWrapper"
import Create_question from "./pages/Create_question"


// define all routes here
const router = createBrowserRouter([
  {
    path: "/",
    element: <SideBarWrapper>
      <Layout />
    </SideBarWrapper>,
    children: [
      {
        path: '',
        element: <PrivateRoute><Home /></PrivateRoute>
      },
      {
        path: 'photos',
        element: <Photos />
      },
      {
        path: '/create-question/:questionType',
        element: <Create_question />
      }
    ],
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  }
])
function App() {
  return (
    <>
      <RouterProvider router={router} fallbackElement={<Loader />} />
    </>
  )
}

export default App
