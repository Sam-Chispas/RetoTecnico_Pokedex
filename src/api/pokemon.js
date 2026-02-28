const cache = {};

export async function fetchPokemon(id) {
  if (cache[id]) return cache[id];
  const res  = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  const p = {
    id: data.id,
    name: data.name,
    sprite: data.sprites.other?.["official-artwork"]?.front_default || data.sprites.front_default,
    spriteSmall: data.sprites.front_default,
    types: data.types.map(t => t.type.name),
    stats: {
      hp:    data.stats[0].base_stat,
      atk:   data.stats[1].base_stat,
      def:   data.stats[2].base_stat,
      spatk: data.stats[3].base_stat,
      spdef: data.stats[4].base_stat,
      spd:   data.stats[5].base_stat,
    },
  };
  cache[id] = p;
  return p;
}