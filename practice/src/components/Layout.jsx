import { Outlet } from "react-router-dom";
import Header from "./Header";
import Search from "./Search";
import { useState } from "react";
import MonsterDetails from "../pages/MonsterDetails";

function Layout() {
  const [selectedMonster, setSelectedMonster] = useState(null);

  return (
    <>
      <Header />
      <Search />
      <div className="middle">
        <div className="content">
          <div className="list">
            <h1>포켓몬 목록</h1>
            <Outlet context={[setSelectedMonster]} />
          </div>
          <div className="info">
            <h1>포켓몬 상세정보</h1>
            {selectedMonster && <MonsterDetails monster={selectedMonster} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
