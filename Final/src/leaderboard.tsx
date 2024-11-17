import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./components/Header";
import Board from "./components/Board";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Header></Header>
        <Board></Board>
    </React.StrictMode>
);
