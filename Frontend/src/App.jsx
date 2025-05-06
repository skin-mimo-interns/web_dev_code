import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection.jsx";
import HowItWorksSection from "./components/HowItWorksSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar.jsx";
import MissionVisionSection from "./components/MissionVisionSection.jsx";
import AboutUsSection from "./components/AboutUsSection.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ComingSoonPage from "./components/ComingSoon.jsx";
import "./App.css"
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <AboutUsSection />
              <MissionVisionSection />
              <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
              {/* ...other sections */}
            </>
          }
        />
        <Route path="/demo" element={<ComingSoonPage />} />
      </Routes>
    </Router>
    
  );
}