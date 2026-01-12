import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DesignCentralStation from './App.tsx';
import CaseStudyWrapper from './components/CaseStudyWrapper';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DesignCentralStation />} />
        <Route path="/:caseId" element={<CaseStudyWrapper />} />
        <Route path="/:caseId/:stopIndex" element={<CaseStudyWrapper />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
