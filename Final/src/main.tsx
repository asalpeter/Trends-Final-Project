import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./components/Header";
import InfoModal from "./components/InfoModal";
import GuessList from "./components/GuessList";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Header></Header>
        <InfoModal></InfoModal>
        <GuessList></GuessList>
    </React.StrictMode>
);
