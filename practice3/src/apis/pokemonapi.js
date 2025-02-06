export async function getPokemonList(limit = 20, offset = 0) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await response.json();

    // 각 포켓몬의 한글 이름과 타입을 가져오기 위해 API 추가 호출
    const detailedPokemon = await Promise.all(
      data.results.map(async (pokemon, index) => {
        const pokemonId = offset + index + 1;

        // 포켓몬 종 (species) 정보 가져오기
        const speciesRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`
        );
        const speciesData = await speciesRes.json();
        const koreanName =
          speciesData.names.find((n) => n.language.name === "ko")?.name ||
          pokemon.name;

        // 포켓몬 상세 정보 가져오기 (타입 포함)
        const pokemonRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
        );
        const pokemonData = await pokemonRes.json();

        // ✅ 모든 타입 한글 변환 (노말, 비행 추가)
        const typeMap = {
          normal: "노말",
          fire: "불꽃",
          water: "물",
          grass: "풀",
          electric: "전기",
          ice: "얼음",
          fighting: "격투",
          poison: "독",
          ground: "땅",
          flying: "비행",
          psychic: "에스퍼",
          bug: "벌레",
          rock: "바위",
          ghost: "고스트",
          dragon: "드래곤",
          dark: "악",
          steel: "강철",
          fairy: "페어리",
        };
        const koreanTypes = pokemonData.types.map(
          (t) => typeMap[t.type.name] || t.type.name
        );

        return {
          id: pokemonId,
          koreanName,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
          types: koreanTypes,
        };
      })
    );

    return { results: detailedPokemon, count: data.count };
  } catch (error) {
    console.error("포켓몬 데이터를 가져오는 중 오류 발생:", error);
    return { results: [], count: 0 };
  }
}
