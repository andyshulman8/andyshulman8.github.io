import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DesignCentralStation from "./App.tsx";
import "./index.css";

const CaseStudyWrapper = lazy(
  () => import("./components/CaseStudyWrapper.tsx")
);

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-black/40">
    <div className="w-12 h-12 border-4 border-transparent border-t-white rounded-full animate-spin" />
  </div>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DesignCentralStation />} />
        <Route
          path="/:caseId"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <CaseStudyWrapper />
            </Suspense>
          }
        />
        <Route
          path="/:caseId/:stopIndex"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <CaseStudyWrapper />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
