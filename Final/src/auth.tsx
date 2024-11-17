import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./components/Login";
import Header from "./components/Header";
import Register from "./components/Register";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Header></Header>
        <div className="row justify-content-around" style={{width:"99%", margin:"auto"}}>
            <div className="col-12 col-md-6">
            <Login></Login>

            </div>
            <div className="col-12 col-md-6">
            <Register></Register>

            </div>
        </div>
    </React.StrictMode>
);
