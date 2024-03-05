// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashbord from "./pages/dashbord";
import { useState, useEffect } from "react";
// import OtherPage from './pages/OtherPage';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} items-center justify-center`}>
      <div className="pl-10 pr-10 font-sans bg-gradient-to-r from-blue-800 via-purple-900 to-pink-700 md:h-screen w-screen">
        <Router>
          <Routes>
            <Route path="/" element={<Dashbord />} />
            {/* <Route path="/other" element={<OtherPage />} /> */}
            {/* Add more routes as needed */}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
