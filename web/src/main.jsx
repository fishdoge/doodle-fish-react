import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Connect from "./connect.jsx";
import Rank from "./page/Rank.jsx";
import Invite from "./page/Invite.jsx";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
// import TonConnectUI from '@tonconnect/ui'
import "./index.css";

// const tonConnectUI = new TonConnectUI({
//     manifestUrl: 'https://tma-next-demo.vercel.app/tonconnect-manifest.json',
// });

const uiPreferences = {
    theme: THEME.LIGHT,
    borderRadius: 8,
    colorSet: {
        [THEME.DARK]: {
            accent: '#007bff',
            background: {
                primary: 'black',
                secondary: '#f8f9fa'
            },
            text: {
                primary: '#ffffff'
            },
            connectButton:{
                background: "#FF5733",
            } 
        },
        [THEME.LIGHT]: {
            accent: '#007bff',
            background: {
                primary: 'black',
                secondary: '#f8f9fa'
            },
            text: {
                primary: '#ffffff'
            },
            connectButton:{
                background: "#FF5733",
            } 
        }
    }
}
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/connect",
        element: <Connect />,
    },
    {
        path: "/ranking",
        element: <Rank />,
    },
    {
        path: "/invite",
        element: <Invite />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <TonConnectUIProvider
            manifestUrl={
                "https://tma-next-demo.vercel.app/tonconnect-manifest.json"
            }
            uiPreferences={uiPreferences}
        >
            <RouterProvider router={router} />
        </TonConnectUIProvider>
    </React.StrictMode>
);

