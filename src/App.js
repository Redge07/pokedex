import React, { createContext, useState } from "react";
import Pokedex from "./pages/Pokedex";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Annexe from "./pages/Annexe";
import Navigation from "./components/Navigation";
import PokemonDetails from "./pages/PokemonDetails";
import NotFound from "./pages/NotFound";
import CreatePokemon from "./pages/CreatePokemon";
import Login from "./pages/Login";
import PrivateRoute from "./helpers/PrivateRoute";

// Je crée un context pour que la base de donnée soit accessible pour n'importe quelle composant et pour savoir si l'utilisateur est connecté ou pas
export const PokemonContext = createContext();

const App = () => {
  // On peut considérer comme la base de données par défaut
  const listPokemon = [
    {
      id: 1,
      name: "Bulbizarre",
      original: "Bulbizarre",
      hp: 25,
      cp: 5,
      picture:
        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
      types: ["Plante", "Poison"],
      created: new Date(),
    },
    {
      id: 2,
      name: "Salamèche",
      original: "Salamèche",
      hp: 28,
      cp: 6,
      picture:
        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
      types: ["Feu"],
      created: new Date(),
    },
    {
      id: 3,
      name: "Carapuce",
      original: "Carapuce",
      hp: 21,
      cp: 4,
      picture:
        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
      types: ["Eau"],
      created: new Date(),
    },
    {
      id: 4,
      name: "Aspicot",
      original: "Aspicot",
      hp: 16,
      cp: 2,
      picture:
        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/013.png",
      types: ["Insecte", "Poison"],
      created: new Date(),
    },
    {
      id: 5,
      name: "Roucool",
      original: "Roucool",
      hp: 30,
      cp: 7,
      picture:
        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/016.png",
      types: ["Normal", "Vol"],
      created: new Date(),
    },
    {
      id: 6,
      name: "Rattata",
      original: "Rattata",
      hp: 18,
      cp: 6,
      picture:
        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/019.png",
      types: ["Normal"],
      created: new Date(),
    },
    {
      id: 7,
      name: "Piafabec",
      original: "Piafabec",
      hp: 14,
      cp: 5,
      picture:
        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/021.png",
      types: ["Normal", "Vol"],
      created: new Date(),
    },
    {
      id: 8,
      name: "Abo",
      original: "Abo",
      hp: 16,
      cp: 4,
      picture:
        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/023.png",
      types: ["Poison"],
      created: new Date(),
    },
    {
      id: 9,
      name: "Pikachu",
      original: "Pikachu",
      hp: 21,
      cp: 7,
      picture:
        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png",
      types: ["Electrik"],
      created: new Date(),
    },
    {
      id: 10,
      name: "Sabelette",
      original: "Sabelette",
      hp: 19,
      cp: 3,
      picture:
        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/027.png",
      types: ["Normal"],
      created: new Date(),
    },
    {
      id: 11,
      name: "Mélofée",
      original: "Mélofée",
      hp: 25,
      cp: 5,
      picture:
        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/035.png",
      types: ["Fée"],
      created: new Date(),
    },
    {
      id: 12,
      name: "Groupix",
      original: "Groupix",
      hp: 17,
      cp: 8,
      picture:
        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/037.png",
      types: ["Feu"],
      created: new Date(),
    },
  ];
  // On met la base de données dans un setter car elle peut etre amené à etre modifié (sinon j'aurai juste déclaré constante classique)
  const [pokemons, setPokemons] = useState(listPokemon);
  // Un setter boolean qui dit si un utilisateur est connecté
  const [login, setLogin] = useState(false);
  const [name, setName] = useState("React");
  return (
    // Je mets mon contexte tout en haut de mon application comme ça tous les composant ont accès à la base de données donc je passe en value pokemons. je passe en value login aussi pour que toute mon application est accès a l'information si mon user est connecté ou pas. Au final seulement le composant Login.js et PrivateRoute.js vont l'utiliser
    <PokemonContext.Provider value={{ pokemons, setPokemons, login, setLogin }}>
      {/* Je définis toutes les routes possible */}
      <BrowserRouter>
        {/* Commun a toutes les pages */}
        <Navigation />
        {/* Toute les routes amène au composant PrivateRoute.js et il prend en props le composant qui est censé etre la destination du lien */}
        <Routes>
          {/* Si l'url est "/test" il utilisera la route déclaré plus bas : "<Route path="/:pokemonUrl" element={<PokemonDetails />}></Route>" mais si c'est "/test/test2" alors on est bien dans le cas du "*" */}
          <Route path="*" element={<NotFound />}></Route>
          {/* Pour cette route l'élément est écrit en toute lettre  */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <div>
                  <h1>Hello {name}</h1>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <p>
                    Il y a {pokemons.length} pokemon
                    {pokemons.length > 1 ? "s" : ""}
                  </p>
                  {/* J'envoie donc la base données sous forme de props au pokédex */}
                  <Pokedex pokemons={pokemons} setPokemons={setPokemons} />
                </div>
              </PrivateRoute>
            }
          ></Route>
          {/* Une route qui va vers un composant, très classique */}
          <Route
            path="/Annexe"
            element={
              <PrivateRoute>
                <Annexe />
              </PrivateRoute>
            }
          ></Route>
          {/* Ici quand j'écris n'importe quoi après le "/" dans l'url, on peut le voir comme un paramètre, d'ou le ":" dans l'url. Grace a useParams je pourrai récupérer le paramètre de l'url. Donc au final si je tape n'importe quoi dans l'url après le "/" je vais forcément tomber sur le composant PokemonDetails qui va récupérer en paramètre le bordel que j'ai tapé au pif */}
          <Route
            path="/:pokemonUrl"
            element={
              <PrivateRoute>
                <PokemonDetails />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/Edit"
            element={
              <PrivateRoute>
                <CreatePokemon />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/Login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </PokemonContext.Provider>
  );
};

export default App;
