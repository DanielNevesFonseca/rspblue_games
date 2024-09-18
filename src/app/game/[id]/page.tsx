import Container from "@/components/Container";
import { IGameProps } from "@/utils/types/game";
import Image from "next/image";
import { Label } from "./components/Label";
import { GameCard } from "@/components/GameCard";
import { Metadata } from "next";
import { metadata } from "@/app/layout";

interface IPropsParams {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: IPropsParams): Promise<Metadata> {
  try {
    const response: IGameProps = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`,
      { next: { revalidate: 320 } }
    )
      .then((res) => res.json())
      .catch(() => {
        return {
          ...metadata,
        };
      });
    return {
      title: response.title,
      description: `${response.description.slice(0, 150)}...`,
      openGraph: {
        title: response.title,
        images: [response.image_url],
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
        },
      },
    };
  } catch (error) {
    return {
      ...metadata,
    };
  }
}

async function getGameById(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`
    );
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data!");
  }
}

async function getRandomGame() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { cache: "no-store" }
    );

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data!");
  }
}

export default async function GameDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const retrieveGame: IGameProps = await getGameById(params.id);
  const gameOfDay: IGameProps = await getRandomGame();
  return (
    <main className="w-full text-black mb-10">
      <div className="bg-black h-80 sm:h-96 w-full relative">
        <Image
          className="object-cover w-full h-80 sm:h-96 opacity-75"
          src={retrieveGame.image_url}
          alt={retrieveGame.title}
          priority={true}
          fill={true}
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
        />
      </div>
      <Container>
        <h1 className="font-bold text-xl my-4">{retrieveGame.title}</h1>
        <p>{retrieveGame.description}</p>

        <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
        <div className="flex items-center gap-2">
          {retrieveGame.platforms.map((platform) => (
            <Label name={platform} key={platform} />
          ))}
        </div>

        <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
        <div className="flex items-center gap-2">
          {retrieveGame.categories.map((category) => (
            <Label name={category} key={category} />
          ))}
        </div>

        <p className="mt-7 mb-4">
          <strong className="text-lg">Lançamento: </strong>{" "}
          {retrieveGame.release}
        </p>

        <h2 className="font-bold text-lg mt-7 mb-2">
          Outro jogo que recomendamos:
        </h2>

        <ul className="flex-grow p-0 m-0">
          <GameCard data={gameOfDay} key={gameOfDay.id} />
        </ul>
      </Container>
    </main>
  );
}
