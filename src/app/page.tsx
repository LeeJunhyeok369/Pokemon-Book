import PokemonList from "./components/PokemonList";

export default function Home() {
  return (
    <main className="">
      <h3 className="font-bold text-xl text-[#fff] leading-[4rem] text-center">
        포켓몬 도감
      </h3>
      <PokemonList />
    </main>
  );
}
