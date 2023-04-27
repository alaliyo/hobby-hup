import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {

            },
        ],
        errorElement: <NotFound />
    }
])

export default router;