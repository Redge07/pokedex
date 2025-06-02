import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NotFound = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          return 0;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    if (count === 0) {
      navigate("/");
    }
  }, [count]);
  return (
    <div>
      <h2>Tu t'es perdu</h2>
      <NavLink to="/">Aller viens je vais pas te laisser là</NavLink>
      <p style={{ marginTop: "20px", fontSize: "50px" }}>{count}</p>
    </div>
  );
};

export default NotFound;
