"use client";

import { GameItem } from "./_components/GameItem";
import type { NextPage } from "next";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Lobby: NextPage = () => {
  const { data: getMatches } = useScaffoldContractRead({
    contractName: "InfernoRoll",
    functionName: "getMatches",
  });

  const { writeAsync: createMatch } = useScaffoldContractWrite({
    contractName: "InfernoRoll",
    functionName: "createMatch",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      console.log(txnReceipt);
    },
  });

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl mt-10 mb-0">Join a Game</h2>
      <button
        className="py-2 px-16 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
        onClick={() => createMatch()}
      >
        Create Match
      </button>
      <div className="flex justify-center px-4 md:px-0 mt-5">
        <div className="overflow-x-auto w-full shadow-2xl rounded-xl">
          <table className="table text-xl bg-base-100 table-zebra w-full md:table-md table-sm">
            <thead>
              <tr className="rounded-xl text-sm text-base-content">
                <th className="bg-primary">Game ID</th>
                <th className="bg-primary">Number Of Players</th>
                <th className="bg-primary">Prize Pool</th>
                <th className="bg-primary">Is Finish?</th>
                <th className="bg-primary">Action</th>
              </tr>
            </thead>
            <tbody>
              {getMatches?.map((m, index) => (
                <GameItem data={m} key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
