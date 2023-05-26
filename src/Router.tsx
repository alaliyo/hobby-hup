import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Gathering from "./pages/Gathering";
import Share from "./pages/Share";
import Transaction from "./pages/Transaction";
import MyPage from "./pages/MyPage";
import LogIn from "./pages/LogIn";
import Buy from "./components/Transaction/Buy";
import Sell from "./components/Transaction/Sell";

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
                path: 'gathering',
                element: <Gathering />
            },
            {
                path: 'share',
                element: <Share />,

            },
            {
                path: 'transaction',
                element: <Transaction />,
                children: [
                    {
                        path: 'buy',
                        element: <Buy />
                    },
                    {
                        path: 'sell',
                        element: <Sell />,
                    },
                ],
            },
            {
                path: 'my-page',
                element: <MyPage />
            },
            {
                path: 'login',
                element: <LogIn />
            },
        ],
        errorElement: <NotFound />
    }
])

export default router;