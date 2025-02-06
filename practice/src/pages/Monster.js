import { useState, useEffect } from "react";
import { getMonsterList } from "../apis/getMonsterList";
import { getPokemonDetail } from "../apis/getMonsterList";
import { useOutletContext } from "react-router-dom";
import "./Monster.css"; // 기존 스타일 유지

function Monster() {
  const [monsterList, setMonsterList] = useState([]);
  const setSelectedMonster = useOutletContext()[0]; // Outlet에서 setSelectedMonster 받기
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1); // 현재 페이지 상태 추가

  const limit = 20; // 한 페이지당 포켓몬 개수
  const offset = (page - 1) * limit; // 페이지에 맞는 offset 계산
  const totalPages = Math.ceil(total / limit); // 전체 페이지 개수

  // 페이징을 숫자로 표현 (1 2 3 4 5 6 7 8 9 10)
  const maxPageButtons = 10; // 한 번에 표시할 페이지 개수
  const startPage =
    Math.floor((page - 1) / maxPageButtons) * maxPageButtons + 1;
  const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const clickHandler = async (name) => {
    const data = await getPokemonDetail(name);
    setSelectedMonster(data); // 클릭한 포켓몬 정보를 Layout으로 전달
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getMonsterList(limit, offset);
      setMonsterList(data.results);
      setTotal(data.count); // 전체 포켓몬 개수 저장
    }

    fetchData();
  }, [page]);

  return (
    <div className="monster-container">
      <ul className="monster-list">
        {monsterList.map((monster) => (
          <li
            key={monster.id}
            className="monster-item"
            onClick={() => clickHandler(monster.englishName)} // 클릭할 때 영어 이름 전달
          >
            <img src={monster.image} alt={monster.name} />
            <p>{monster.name}</p> {/* 한글 이름 표시 */}
          </li>
        ))}
      </ul>

      {/* 숫자 페이지네이션 */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          이전
        </button>

        {pages.map((p) => (
          <button
            key={p}
            className={`page-btn ${p === page ? "active" : ""}`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default Monster;
