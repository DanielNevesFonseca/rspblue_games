import { IGameProps } from "@/utils/types/game";
import Link from "next/link";
import Image from "next/image";
import { BiRightArrowCircle } from "react-icons/bi";

interface IGameCardProps {
  data: IGameProps;
}

export function GameCard({ data }: IGameCardProps) {
  return (
    <Link
      className="w-full rounded-lg hover:scale-105 transition-all duration-500  "
      href={`/game/${data.id}`}
    >
      <li className="w-full bg-slate-200 rounded-lg list-none border border-slate-300 shadow">
        <div className="relative w-full h-56">
          <Image
            className="rounded-t-lg object-cover"
            src={data.image_url}
            alt={data.title}
            fill={true}
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
          />
        </div>
        <div className="p-3 flex items-center justify-between gap-2">
          <p className="truncate whitespace-nowrap text-sm text-gray-700">
            {data.title}
          </p>
          <BiRightArrowCircle size={24} color="#374151" />
        </div>
      </li>
    </Link>
  );
}
