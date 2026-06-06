import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import FieldNotes from "./pages/FieldNotes.jsx";
import FieldNoteSingle from "./pages/FieldNoteSingle.jsx";
import "./index.css";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import RequestWebsite from "./pages/RequestWebsite";
import NotFound from "./pages/NotFound";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/field-notes" element={<FieldNotes />} />
          <Route path="/field-notes/:slug" element={<FieldNoteSingle />} />
          <Route path="/request-website" element={<RequestWebsite />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);