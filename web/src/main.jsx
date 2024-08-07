import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Connect from "./connect.jsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/connect",
        element: <Connect />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <TonConnectUIProvider
            manifestUrl={
                "https://tma-next-demo.vercel.app/tonconnect-manifest.json"
            }
        >
            <RouterProvider router={router} />
        </TonConnectUIProvider>
    </React.StrictMode>
);

