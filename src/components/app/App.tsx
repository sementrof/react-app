// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MainComponent from "../header/navbar/Header";
// import SearchBar from "../searchbar/SearchBar";
// import DirectionPage from "../pages/direction-page";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/" element={<MainComponent />} />
//           <Route path="/directions/:direction" element={<DirectionPage />} />
//         </Routes>
//         <SearchBar />
//       </div>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainComponent from "../header/navbar/Header";
import SearchBar from "../searchbar/SearchBar";
import DirectionPage from "../pages/direction-page/direction-page";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="/directions/:direction" element={<DirectionPage />} />
        </Routes>
        <SearchBar />
      </div>
    </Router>
  );
};

export default App;
