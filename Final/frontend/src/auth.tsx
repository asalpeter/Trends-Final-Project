import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import AuthComponent from "./components/Login";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Header></Header>
        <AuthComponent></AuthComponent>
    </React.StrictMode>
);
