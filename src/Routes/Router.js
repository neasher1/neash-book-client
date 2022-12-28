import { createBrowserRouter } from "react-router-dom";
import About from "../components/About";
import Home from "../components/Home/Home/Home";
import Media from "../components/Home/Media";
import Login from "../components/shared/Authentication/Login";
import Register from "../components/shared/Authentication/Register";
import Main from "../layout/Main";

const router = createBrowserRouter([

    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/media',
                element: <Media></Media>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    }

]);

export default router;