import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Gathering from "./pages/Gathering";
import Share from "./pages/Share";
import Sell from "./pages/Sell";
import MyPage from "./pages/MyPage";
import LogIn from "./pages/LogIn";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: '/gathering',
                element: <Gathering />
            },
            {
                path: '/share',
                element: <Share />
            },
            {
                path: '/sell',
                element: <Sell />
            },
            {
                path: '/my-page',
                element: <MyPage />
            },
            {
                path: '/login',
                element: <LogIn />
            },
        ],
        errorElement: <NotFound />
    }
])

export default router;