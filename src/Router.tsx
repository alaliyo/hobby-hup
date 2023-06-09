import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";

import MyPage from "./pages/MyPage";
import MyTransaction from "./components/MyPage/MyTransaction";
import MyShare from "./components/MyPage/MyShare";
import MyGathering from "./components/MyPage/MyGathering";
import MyChattings from './components/MyPage/Chattings';

import Gathering from "./pages/Gathering";

import Share from "./pages/Share";

import Transaction from "./pages/Transaction";
import Buy from "./components/Transaction/Buy";
import Sell from "./components/Transaction/Sell";
import TransactionDetail from "./components/Transaction/TransactionDetail";
import TransactionWrite from "./components/Transaction/TransactionWrite";
import Chatting from "./pages/Chatting";
import Notice from "./pages/Notice";


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
                path: 'my-page',
                element: <MyPage />,
                children: [
                    {
                        path: 'transaction/:category',
                        element: <MyTransaction />,
                    },
                    {
                        path: 'share/:category',
                        element: <MyShare />,
                    },
                    {
                        path: 'chattings',
                        element: <MyChattings />,
                    },
                    {
                        path: 'gathering',
                        element: <MyGathering />,
                    },
                ]
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
                    {
                        path: ':category/:postId',
                        element: <TransactionDetail />
                    },
                    {
                        path: 'write/:category',
                        element: <TransactionWrite />
                    },
                ],
            },
            {
                path: 'chatting/:postId',
                element: <Chatting />,
            },
            {
                path: 'notice',
                element: <Notice />,
            },
            {
                path: 'login',
                element: <LogIn />,
            },
        ],
        errorElement: <NotFound />
    }
])

export default router;