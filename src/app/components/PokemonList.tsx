"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/pokemons");
        setPokemons(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ul className="max-w-[1240px] m-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
      {pokemons.map((pokemon) => (
        <li key={pokemon.id} className="h-48 px-2 border border-white">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={96}
            height={96}
            unoptimized
            className="mx-auto my-4"
          />
          <p className="text-white">{pokemon.korean_name || pokemon.name}</p>
          <p className="text-white">도감번호: {pokemon.id}</p>
        </li>
      ))}
    </ul>
  );
}

export default PokemonList;
