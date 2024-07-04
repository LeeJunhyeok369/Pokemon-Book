import axios from "axios";
import Image from "next/image";
import Link from "next/link";

async function fetchPokemon(id: string) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/pokemons/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const pokemon = await fetchPokemon(params.id);

  if (!pokemon) {
    return (
      <div className="w-full min-h-[100vh] flex items-center justify-center">
        <p className="text-white">Error loading data</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center">
      <div className="w-full max-w-[800px] m-auto mt-6 text-center flex-col rounded-lg overflow-hidden">
        <div className="bg-gray-300 w-full py-3">
          <h3 className="font-semibold text-xl">
            {pokemon.korean_name} ({pokemon.name})
          </h3>
          <p>No. {pokemon.id.toString().padStart(4, "0")}</p>
        </div>
        <div className="py-3 px-5 text-center bg-white w-full">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={96}
            height={96}
            unoptimized
            className="mx-auto"
          />
          <h3>이름: {pokemon.korean_name}</h3>
          <p>
            키: {pokemon.height / 10} m 무게: {pokemon.weight / 10} kg
          </p>
          <p className="mb-2">
            타입:{" "}
            {pokemon.types.map((type: any) => type.type.korean_name).join(", ")}{" "}
            특성:{" "}
            {pokemon.abilities
              .map((ability: any) => ability.ability.korean_name)
              .join(", ")}
          </p>
          <p>
            기술:{" "}
            {pokemon.moves.map((move: any) => move.move.korean_name).join(", ")}
          </p>
          <Link
            className="block px-3 py-2 mt-2 rounded-sm bg-blue-500 hover:bg-blue-400 text-white transition ease-in-out"
            href="/"
          >
            메인으로 이동
          </Link>
        </div>
      </div>
    </div>
  );
}
