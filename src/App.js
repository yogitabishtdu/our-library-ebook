import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import DetailedPage from "./components/detailedPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<DetailedPage />} />
      </Routes>
    </div>
  );
}

export default App;
