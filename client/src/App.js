import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import OtherPage from "./OtherPage";
//import Fib2 from "./Fib2";
import Fib from "./Fib";

function App() {
  return (
    <Router>
      <div className="App">
          <Link to="/">Home</Link> |
          <Link to="/otherpage">Other Page</Link>
        <div>
          <hr/>
          <Routes>
            <Route path="/" element={<Fib/>} />
            <Route path="/otherpage" element={<OtherPage/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
