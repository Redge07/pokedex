import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { PokemonContext } from "../App";
import ColorsType from "../helpers/ColorsType";
import SetPokemonDetails from "../components/SetPokemonDetails";

const PokemonDetails = () => {
  // Pour récupérer la base de données des pokémons qui est accessible partout grace à la création d'un context
  const { pokemons, setPokemons } = useContext(PokemonContext);
  // Je récupère les paramètre de mon url
  const { pokemonUrl } = useParams();
  // setter pour récupérer le pokémon de la base de données qui correspond a l'id de l'url
  const [pokemon, setPokemon] = useState(null);
  // Pour retourner a l'acceuil si l'url ne correspond a aucun pokemon
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  // Au chargement de ce composant on récupère le pokémon qui correspond a l'id de l'url
  useEffect(() => {
    setTimeout(() => {
      const id = pokemonUrl.split("-")[1];
      let found = null;
      for (let i = 0; i < pokemons.length; i++) {
        if (pokemons[i].id == id) {
          found = pokemons[i];
          break;
        }
      }
      if (found) {
        setPokemon(found);
      } else {
        navigate("/");
      }
    }, 300);
  }, [pokemons]);

  if (!pokemon) {
    return <div className="chargement"></div>;
  }

  return (
    // Si on est en edit, le composant SetPokemonDetais prend toute la page, si on est n'est pas en edit la page comporte le contenu de base du composant PokemonDetails

    <div className="page">
      {edit && <SetPokemonDetails pokemon={pokemon} setEdit={setEdit} />}
      {!edit && (
        <div className="containerDetails">
          <h2>{pokemon.name}</h2>
          <div className="details">
            <img src={pokemon.picture} />
            <div className="edit">
              <button onClick={() => setEdit(true)}>
                <i className="fa-solid fa-pen"></i>
              </button>
              {/* Bouton qui supprime le pokémon en question */}
              <button
                style={{ background: "red" }}
                onClick={() => {
                  // On modifie la base de données en disant simplement qu'on garde que les pokémons qui n'ont pas le meme identifiant du pokémon sur lequel on a cliqué
                  setPokemons((prev) => {
                    return prev.filter(
                      (prevPokemon) => prevPokemon.id !== pokemon.id
                    );
                  });
                }}
              >
                <i style={{ color: "white" }} className="fa-solid fa-trash"></i>
              </button>
            </div>
            <div className="grid">
              <h4>Nom</h4>
              <p>{pokemon.name}</p>
              <h4>Points de vie</h4>
              <p>{pokemon.hp}</p>
              <h4>Dégats</h4>
              <p>{pokemon.cp}</p>
              <h4>Types</h4>
              <ul>
                {pokemon.types.map((type) => (
                  <li key={type}>
                    <ColorsType type={type} />
                  </li>
                ))}
              </ul>
              <h4>Date de création</h4>
              <p>{pokemon.created.toLocaleDateString("fr-FR")}</p>
            </div>
            <div className="retour">
              <NavLink to="/">
                <button>retour</button>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
