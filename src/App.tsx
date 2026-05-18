import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from './components/nav/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import { ProductsPage, ProductDetailPage } from './pages/Products';
import { ResearchPage, AboutPage, BlogPage, BlogPostPage, CareersPage, ContactPage } from './pages/SubPages';
import { DeterministicPage, InterpretabilityPage, MedicalAIPage } from './pages/ResearchPages';
import Admin from './pages/Admin';
import { initReveal } from './hooks/useReveal';

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Give React one frame to commit the new page's DOM, then reveal
    const cleanup = initReveal();
    // Run again at 200ms to catch any late-rendered elements
    const t = setTimeout(() => initReveal(), 200);
    return () => { cleanup(); clearTimeout(t); };
  }, [pathname]);
  return null;
}

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollReset />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<PageLayout><Home /></PageLayout>} />
        <Route path="/products" element={<PageLayout><ProductsPage /></PageLayout>} />
        <Route path="/products/:id" element={<PageLayout><ProductDetailPage /></PageLayout>} />
        <Route path="/research" element={<PageLayout><ResearchPage /></PageLayout>} />
        <Route path="/research/deterministic" element={<PageLayout><DeterministicPage /></PageLayout>} />
        <Route path="/research/interpretability" element={<PageLayout><InterpretabilityPage /></PageLayout>} />
        <Route path="/research/medical" element={<PageLayout><MedicalAIPage /></PageLayout>} />
        <Route path="/about" element={<PageLayout><AboutPage /></PageLayout>} />
        <Route path="/blog" element={<PageLayout><BlogPage /></PageLayout>} />
        <Route path="/blog/:slug" element={<PageLayout><BlogPostPage /></PageLayout>} />
        <Route path="/careers" element={<PageLayout><CareersPage /></PageLayout>} />
        <Route path="/contact" element={<PageLayout><ContactPage /></PageLayout>} />
        <Route path="*" element={<PageLayout><NotFound /></PageLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p className="t-label" style={{ marginBottom: 16 }}>404</p>
        <h1 className="t-h2">Page not found.</h1>
        <a href="/" className="btn btn--ghost" style={{ marginTop: 24, display: 'inline-flex' }}>← Go home</a>
      </div>
    </div>
  );
}
