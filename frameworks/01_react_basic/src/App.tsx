import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrganizationView from "./views/OrganizationView";
import RickAndMortyView from "./views/RickAndMortyView.tsx";
import Header from "./components/Header";
import Footer from "./components/Footer.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Routes>
          <Route path="/" element={<OrganizationView />} />
          <Route path="/rick-and-morty" element={<RickAndMortyView />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
