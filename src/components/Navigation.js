import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <header>
      <NavLink className="lien" to={"/"}>
        Acceuil
      </NavLink>
      <NavLink className="lien" to={"/Annexe"}>
        Annexe
      </NavLink>
    </header>
  );
};

export default Navigation;
