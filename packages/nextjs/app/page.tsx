import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Inferno Roll</span>
          </h1>
          <Image className="ml-8" alt="Game" width={400} height={350} src="/game.png" />
          <p className="text-center text-lg mb-0">Survive the advancing lava by rolling dice to move </p>
          <p className="text-center text-lg mt-0">your character and outlast other players</p>
          <div className="flex justify-center mb-2">
            <Link
              href="/board"
              passHref
              className=" py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-400 disabled:opacity-50"
            >
              Play
            </Link>
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="text-center">
            <h2 className="mt-3 text-4xl">How to Play</h2>
          </div>
          <div className="flex justify-center">
            <div className="w-[700px]">
              <h3 className="text-2xl">To win:</h3>
              <p>
                The last player remaining on the game board after all other players have been eliminated by the lava is
                declared the winner
              </p>
              <h2 className="mt-3 text-2xl">Gameplay</h2>
              <ul className="list-disc" style={{ width: "600px" }}>
                <li>Players roll a 6-sided dice</li>
                <li>The lava moves the same number of spaces as the player rolls</li>
                <li>If the lava reaches a player&apos;s token, that player is eliminated from the game</li>
                <li>When a new player joins, they move 20 spaces ahead of the lava</li>
                <li>The last player remaining on the board wins the game</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
