import {
    createBrowserRouter,
    RouterProvider,
    Outlet
} from "react-router-dom"
import { useEffect, useState } from "react";
import Dashboard from "../views/Dashboard/Dashboard"
import Postad from "../views/Postad/Postad";
import Detail from "../views/Detail/detail";
import Footer from "../Components/footer/index"
import Navbar from "../Components/navbar/Navbar";
import Login from "../views/Login/index"
import { onAuthStateChanged, auth } from "../config/firebase";
import Register from "../views/Register";
import Reset from "../views/Reset";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/postad",
                element: <Postad />,
            },
            {
                path: "/detail/:adId",
                element: <Detail />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/reset",
                element: <Reset />,
            },
        ]
    }
]);

function Layout() {
    const [user , setUser] = useState(); 

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        });
    }, [])

    return <div>
    <Navbar user={user} />
    <Outlet user={user} />
    <Footer />
</div>
}

function Router() {
    return <RouterProvider router={router} />
}

export default Router