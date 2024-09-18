import Container from "@/components/Container";
import { GameCard } from "@/components/GameCard";
import { Input } from "@/components/Input";
import { IGameProps } from "@/utils/types/game";

async function getGameBySearchTitle(title: string) {
  try {
    const decodedTitle = decodeURI(title);
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodedTitle}`
    );

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data!");
  }
}

export default async function SearchGameByTitlePage({
  params: { title },
}: {
  params: { title: string };
}) {
  const gamesList: IGameProps[] = await getGameBySearchTitle(title);

  return (
    <main>
      <Container>
        <Input />
        <h1 className="text-xl text-black font-semibold mb-5 mt-8">
          Olha o que encontramos nos nossos servidores...
        </h1>

        {!gamesList && <p>Não encontramos nenhum jogo com o nome {title}</p>}

        {gamesList && (
          <ul className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-5">
            {gamesList.map((game) => (
              <GameCard key={game.id} data={game} />
            ))}
          </ul>
        )}
      </Container>
    </main>
  );
}
