import "./App.css";
import Navbar from "./components/navbar";
import LandingPage from "./pages/LandingPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ResumeForm from "./pages/ResumeForm";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import AtsChecker from "./pages/AtsChecker";

function App() {

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<ResumeForm/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/ats" element={<AtsChecker/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
