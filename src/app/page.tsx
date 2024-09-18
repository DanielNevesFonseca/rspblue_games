import Container from "@/components/Container";
import { GameCard } from "@/components/GameCard";
import { Input } from "@/components/Input";
import { IGameProps } from "@/utils/types/game";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRightSquare } from "react-icons/bs";

async function getRandomGame() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { next: { revalidate: 360 } }
    );

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data!");
  }
}

async function getGamesList() {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=games`, {
      next: { revalidate: 320 },
    });

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data!");
  }
}

export default async function Home() {
  const randomGame: IGameProps = await getRandomGame();
  const gamesList: IGameProps[] = await getGamesList();

  return (
    <main className="w-full">
      <Container>
        <h1 className="text-center font-bold text-xl mb-5 mt-8">
          Separamos um jogo exclusivo para você!
        </h1>

        <Link href={`/game/${randomGame.id}`}>
          <section className="w-full bg-black rounded-lg">
            <div className="w-full max-h-96 h-96 relative rounded">
              <div className="absolute z-20 bottom-0 p-3 flex justify-center items-center gap-3">
                <p className="text-white text-lg font-semibold">
                  {randomGame.title}
                </p>
                <BsArrowRightSquare size={24} color="#fff" />
              </div>

              <Image
                className="w-full object-fill rounded max-h-96 opacity-50 hover:opacity-80 transition-all duration-500"
                src={randomGame.image_url}
                alt={randomGame.title}
                priority={true}
                quality={100}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200) 44vw"
              />
            </div>
          </section>
        </Link>

        <Input />

        <h2 className="text-lg font-bold mt-8 mb-5">Jogos Para Conhecer</h2>
        <ul className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-5">
          {gamesList.map((game) => (
            <GameCard key={game.id} data={game} />
          ))}
        </ul>
      </Container>
    </main>
  );
}
