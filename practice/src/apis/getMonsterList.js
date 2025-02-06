export async function getMonsterList(limit = 20, offset = 0) {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await res.json();

    // 포켓몬의 한글 이름을 가져오기 위한 추가 API 요청
    const detailedPokemon = await Promise.all(
      data.results.map(async (pokemon, index) => {
        const speciesRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${offset + index + 1}/`
        );
        const speciesData = await speciesRes.json();
        const koreanName =
          speciesData.names.find((name) => name.language.name === "ko")?.name ||
          pokemon.name;

        return {
          name: koreanName, // 한글 이름 적용
          englishName: pokemon.name, // 영어 이름도 저장 (필요하면 사용)
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            offset + index + 1
          }.png`,
          id: offset + index + 1,
        };
      })
    );

    console.log("API 응답 데이터:", detailedPokemon);
    return { results: detailedPokemon, count: data.count };
  } catch (error) {
    console.error("포켓몬 데이터를 가져오는 중 오류 발생:", error);
    return { results: [], count: 0 }; // 오류 발생 시 빈 배열 반환
  }
}

export async function getPokemonDetail(name) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await res.json();
  console.log("클릭한 정보", data);
  return data;
}
