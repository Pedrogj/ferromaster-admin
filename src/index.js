import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const divRoot = document.getElementById("root");
const root = createRoot(divRoot);

root.render(<App />);
