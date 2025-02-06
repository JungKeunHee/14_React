import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Monster from "./pages/Monster";
import MonsterDetails from "./pages/MonsterDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Monster />} />
          <Route path=":monster" element={<MonsterDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
