import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Rating } from "./components/rating";
import { TextExpander } from "./components/text-expander";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
         <App />
        {/* <Rating maxRating={10} /> */}
        {/*<TextExpander />*/}
    </React.StrictMode>
);
