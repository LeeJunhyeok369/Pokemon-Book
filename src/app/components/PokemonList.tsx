"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/pokemons");
        setPokemons(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center">
      {loading ? (
        <MoonLoader color="#ffffff" size={50} />
      ) : pokemons.length !== 0 ? (
        <ul className="w-full max-w-[1240px] m-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
          {pokemons.map((pokemon) => (
            <li
              key={pokemon.id}
              className="h-48 px-2 border border-white cursor-pointer"
            >
              <Link href={`/detail/${pokemon.id}`}>
                <div className="text-center">
                  <Image
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width={96}
                    height={96}
                    unoptimized
                    className="mx-auto my-4"
                  />
                  <p className="text-white">
                    {pokemon.korean_name || pokemon.name}
                  </p>
                  <p className="text-white">도감번호: {pokemon.id}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">포켓몬 데이터를 불러오지 못했습니다.</p>
      )}
    </div>
  );
}

export default PokemonList;
