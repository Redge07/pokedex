import React from "react";
import SetPokemonDetails from "../components/SetPokemonDetails";

const CreatePokemon = () => {
  return (
    <div>
      {/* La page ne contient que le composant setPokemonDetails qui créer un pokemon car ce composant ressemble a modifier un pokemon, on lui envoie un pokemon par défaut on va dire pour pré remplir des case, le paramètre setEdit pour que le composant sache la difference entre modifier et créer un pokemon */}
      <SetPokemonDetails
        pokemon={{ name: "...", hp: 100, cp: 10, types: ["Normal"] }}
        setEdit={false}
      />
    </div>
  );
};

export default CreatePokemon;
