import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Loader from "./components/Loader"
import ErrorPage from "./components/ErrorPage"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import PrivateRoute from "./components/PrivateRout"
import Layout from "./Layout"
import SideBarWrapper from "./components/SideBarWrapper"
import Create_question from "./pages/Create_question"
import UploadSign from "./pages/UploadSign"
import Create_practice_set from "./pages/Create_practice_set"
import Add_practice_set_questions from "./pages/Add_practice_set_questions"
import { Toaster } from "react-hot-toast"


// define all routes here
const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><SideBarWrapper>
      <Layout />
    </SideBarWrapper>
    </PrivateRoute>,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'upload-sign',
        element: <UploadSign />
      },
      {
        path: '/create-question/:questionType',
        element: <Create_question />
      },
      {
        path: '/create-practice-set',
        element: <Create_practice_set />
      },
      {
        path: '/add_practice_set_questions',
        element: <Add_practice_set_questions />
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
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <RouterProvider router={router} fallbackElement={<Loader />} />
    </>
  )
}

export default App
