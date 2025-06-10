import HeroSection from "./components/HeroSection";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
import PlatformAdvantages from "./components/PlatformAdvantages";
import JourneySection from "./components/JourneySection";
import SkinHealthSolutionSection from "./components/Features";
import WhyChooseTaiuoSection from "./components/WhyChooseTaiuo";
import GetInTouch from "./components/GetInToch";
import AnalysisPage from "./components/Analysis";
import Navbar from "./components/Navbar";
export default function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <PlatformAdvantages/>
              <JourneySection/>
              <SkinHealthSolutionSection/>
              <WhyChooseTaiuoSection/>
              <GetInTouch/>
            </>
          }
        />
        <Route path="/analysis" element={<AnalysisPage />} />
      </Routes>
    </Router> 
    
  );
}