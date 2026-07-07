import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App.jsx";
import ClarksvilleWebDesign from "./ClarksvilleWebDesign";
import FieldNotes from "./pages/FieldNotes.jsx";
import FieldNoteSingle from "./pages/FieldNoteSingle.jsx";
import RequestWebsite from "./pages/RequestWebsite";
import RequestFlyer from "./pages/RequestFlyer";
import ProofOfWork from "./pages/ProofOfWork.jsx";
import ProjectSingle from "./pages/ProjectSingle.jsx";
import NotFound from "./pages/NotFound";

import "./index.css";
import "./App.css";

import ScrollToTop from "./components/ScrollToTop.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/clarksville-web-design" element={<ClarksvilleWebDesign />} />
          <Route path="/field-notes" element={<FieldNotes />} />
          <Route path="/field-notes/:slug" element={<FieldNoteSingle />} />
          <Route path="/request-website" element={<RequestWebsite />} />
          <Route path="/request-flyer" element={<RequestFlyer />} />
          <Route path="/proof-of-work" element={<ProofOfWork />} />
          <Route path="/proof-of-work/:slug" element={<ProjectSingle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);