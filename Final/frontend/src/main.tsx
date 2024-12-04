import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import InfoModal from "./components/InfoModal";
import GuessTheNumberGame from "./components/GuessTheNumberGame";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Header></Header>
        <InfoModal></InfoModal>
       
        <GuessTheNumberGame></GuessTheNumberGame>
    </React.StrictMode>
);
