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
import GatheringList from "./components/Gathering/GatheringList";
import GatheringDetail from "./components/Gathering/GatheringDetail";
import GatheringWrite from "./components/Gathering/GatheringWrite";

import Transaction from "./pages/Transaction";
import Buy from "./components/Transaction/Buy";
import Sell from "./components/Transaction/Sell";
import TransactionDetail from "./components/Transaction/TransactionDetail";
import TransactionWrite from "./components/Transaction/TransactionWrite";

import Chatting from "./pages/Chatting";

import Notice from "./pages/Notice";
import NoticeDetail from "./components/Notice/NoticeDetail";
import NoticeWrite from "./components/Notice/NoticeWrite";
import NoticePostList from "./components/Notice/NoticePostList";

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
                element: <Gathering />,
                children: [
                    {
                        path: '',
                        element: <GatheringList />,
                    },
                    {
                        path: 'Detail/:postId',
                        element: <GatheringDetail />,
                    },
                    {
                        path: 'write',
                        element: <GatheringWrite />,
                    },
                ]
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
                children: [
                    {
                        path: '',
                        element: <NoticePostList />,
                    },
                    {
                        path: 'detail/:postId',
                        element: <NoticeDetail />,
                    },
                    {
                        path: 'write',
                        element: <NoticeWrite />,
                    },
                ],
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