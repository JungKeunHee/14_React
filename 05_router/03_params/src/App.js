import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Main from "./pages/Main";
import MenuDetail from "./pages/MenuDetail";
import MenuSearchResult from "./pages/MenuSearchResult";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/main" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu">
            <Route index element={<Menu />} />
            <Route path=":menuCode" element={<MenuDetail />} />
            <Route path="search" element={<MenuSearchResult />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
