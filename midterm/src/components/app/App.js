import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as url } from "../routes";

const App = () => {
  const renderPages = (url) => {
    return url.map((page) => (
      <Route
            key={page.path}
            path={page.path}
            element={page.element}
            index={page.index}
          />
    ))
  }

  return (
    <Router>
      <Routes>
      {renderPages(url)}
      </Routes>
    </Router>
    
  );
};

export default App;
