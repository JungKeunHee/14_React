import { useState, useEffect, useRef } from "react";
import { getPokemonList } from "../apis/pokemonapi";
import "./Main.css"; // 스타일 추가

function Main() {
  const [pokemonList, setPokemonList] = useState([]); // 포켓몬 리스트
  const [page, setPage] = useState(1); // 현재 페이지 (offset을 계산하기 위함)
  const [loading, setLoading] = useState(false); // 데이터 로딩 여부
  const observerRef = useRef(null); // Intersection Observer를 위한 ref
  const mainContainerRef = useRef(null); // `.main` 내부에서 스크롤 감지

  const limit = 20; // 한 번에 가져올 데이터 개수
  const offset = (page - 1) * limit; // offset 계산

  useEffect(() => {
    async function fetchData() {
      if (loading) return; // 이미 로딩 중이면 중복 요청 방지
      setLoading(true);

      const data = await getPokemonList(limit, offset);
      setPokemonList((prevList) => [...prevList, ...data.results]); // 기존 데이터에 추가
      setLoading(false);
    }

    fetchData();
  }, [page]);

  // `.main` 내부에서만 스크롤을 감지하도록 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { root: mainContainerRef.current, threshold: 1 } // `.main` 내부에서 감지
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="main" ref={mainContainerRef}>
      <div className="pokemon-grid">
        {pokemonList.map((pokemon) => {
          const formattedId = pokemon.id.toString().padStart(4, "0");

          return (
            <div key={pokemon.id} className="pokemon-card">
              <img
                src={pokemon.image}
                alt={pokemon.koreanName}
                className="pokemon-image"
              />
              <p className="pokemon-id">No.{formattedId}</p>
              <p className="pokemon-name">{pokemon.koreanName}</p>
              <div className="pokemon-types">
                {pokemon.types.map((type, i) => (
                  <span key={i} className={`pokemon-type ${type}`}>
                    {type}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 무한 스크롤 트리거 (마지막 요소) */}
      <div
        ref={observerRef}
        style={{ height: "20px", background: "transparent" }}
      />

      {loading && <p>로딩 중...</p>}
    </div>
  );
}

export default Main;
