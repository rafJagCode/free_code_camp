const types = new Map([
  ["normal", "#A8A878"],
  ["fighting", "#C03028"],
  ["flying", "#A890F0"],
  ["poison", "#A040A0"],
  ["ground", "#E0C068"],
  ["rock", "#B8A038"],
  ["bug", "#A8B820"],
  ["ghost", "#705898"],
  ["steel", "#B8B8D0"],
  ["fire", "#F08030"],
  ["water", "#6890F0"],
  ["grass", "#78C850"],
  ["electric", "#F8D030"],
  ["psychic", "#F85888"],
  ["ice", "#98D8D8"],
  ["dragon", "#7038F8"],
  ["dark", "#705848"],
  ["fairy", "#EE99AC"],
  ["unknown", "#68A090"],
  ["shadow", "#604E82"],
]);

const addType = (type) => {
  const typesEl = document.getElementById("types");
  const typeEl = document.createElement("p");
  typeEl.classList.add("type");
  typeEl.innerText = type;
  typeEl.style.background = types.get(type);
  typesEl.appendChild(typeEl);
};

const fillStats = (pokemon) => {
  const stats = [
    ["pokemon-id", pokemon.id],
    ["pokemon-name", pokemon.name],
    ["weight", pokemon.weight],
    ["height", pokemon.height],
  ];
  for (const [id, value] of stats) {
    const statEl = document.getElementById(id);
    statEl.innerText = value;
  }
};

const fillTable = (pokemon) => {
  fillStats(pokemon);
  pokemon.stats.forEach((el) => {
    const statEl = document.getElementById(`${el.stat.name}`);
    statEl.innerText = el.base_stat;
  });
};

const addImg = (src) => {
  const spriteEl = document.getElementById("sprite");
  spriteEl.src = src;
  spriteEl.style.visibility = "visible";
};

const clearTypes = () => {
  document.querySelectorAll(".type")?.forEach((typeEl) => typeEl.remove());
};

const handleSearch = async () => {
  let response;
  const inputVal = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase();
  try {
    response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputVal}`
    );
  } catch (err) {
    alert("Network error");
    return;
  }
  if (!response.ok) {
    alert("Pokémon not found");
    return;
  }
  const pokemon = await response.json();
  clearTypes();
  addImg(pokemon.sprites.front_default);
  pokemon.types.forEach((el) => addType(el.type.name));
  fillTable(pokemon);
};
