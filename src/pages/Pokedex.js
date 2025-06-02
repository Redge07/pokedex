import React, { useState } from "react";
import Card from "../components/Card";
import { NavLink } from "react-router-dom";

const Pokedex = ({ pokemons, setPokemons }) => {
  // setter qui prend en valeur le contenu dans la barre de recherche dynamique
  const [pokemonSearch, setPokemonSearch] = useState("");
  // setter qui permet de d'afficher les pokemons avec le type sélectionné
  const [type, setType] = useState("");
  // Fonction qui reçoie le nouveau nom du pokémon depuis le composant card
  const handlePokemon = (value, id) => {
    setPokemons((prev) => {
      // Je mofie seulement le pokémon qui détient l'id concerné
      return prev.map((pokemon) =>
        pokemon.id === id ? { ...pokemon, name: value } : pokemon
      );
    });
  };
  return (
    <div>
      <NavLink to="/Edit" className="add">
        <i className="fa-solid fa-plus"></i>
      </NavLink>
      <h2>Champ de recherche dynamique</h2>
      <input
        type="text"
        onChange={(e) => setPokemonSearch(e.target.value.toLowerCase())}
      />
      <h2>Sélection des type</h2>
      <select onChange={(e) => setType(e.target.value)}>
        <option value="">Choisir un type</option>
        <option value="Feu">Feu</option>
        <option value="Eau">Eau</option>
        <option value="">Plante</option>
        <option value="Electrik">Electrik</option>
        <option value="Fée">Fée</option>
        <option value="Normal">Normal</option>
        <option value="Poison">Poison</option>
      </select>
      <ul className="pokedex">
        {/* On parcours la base de données pokémon */}
        {pokemons
          .filter((pokemon) => {
            // Si le contenu de la recherche dynamique est vide alors on garde tous les pokémon de la base de données qui qu'ils puissent etre affichés
            if (pokemonSearch === "") {
              return pokemon;
              // Sinon on garde seulement les pokémons qui contiennent un bout du contenu de la recherche dynamique dans leur nom
            } else {
              return pokemon.name.toLowerCase().includes(pokemonSearch);
            }
          })
          // Après le filtre on affiche toutes les cartes
          .filter((pokemon) => {
            if (type === "") {
              return pokemon;
            } else {
              return pokemon.types.includes(type);
            }
          })
          .map((pokemon) => {
            return (
              // EN props j'envoie le pokémon en question et une fonction
              <Card
                key={pokemon.id}
                searchDynamic={pokemonSearch}
                pokemon={pokemon}
                handlePokemon={handlePokemon}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default Pokedex;
