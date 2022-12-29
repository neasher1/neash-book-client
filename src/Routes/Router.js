import { createBrowserRouter } from "react-router-dom";
import About from "../components/About";
import Home from "../components/Home/Home/Home";
import Media from "../components/Home/Media";
import PostDetails from "../components/Home/PostDetails";
import Login from "../components/shared/Authentication/Login";
import Register from "../components/shared/Authentication/Register";
import DisplayError from "../components/shared/DisplayError";
import Main from "../layout/Main";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";

const router = createBrowserRouter([

    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/media',
                element: <PrivateRoutes><Media></Media></PrivateRoutes>
            },
            {
                path: '/media/:_id',
                loader: ({ params }) => fetch(`http://localhost:5000/posts/${params._id}`),
                element: <PostDetails></PostDetails>
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