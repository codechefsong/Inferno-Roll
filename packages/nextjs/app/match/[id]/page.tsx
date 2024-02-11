"use client";

import { useRouter } from "next/navigation";
import { Player } from "./_components/Player";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const MatchRoom = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { address } = useAccount();

  const { data: matchData } = useScaffoldContractRead({
    contractName: "InfernoRoll",
    functionName: "getMatchByID",
    args: [params?.id as any],
  });

  const { data: lavaPosititon } = useScaffoldContractRead({
    contractName: "InfernoRoll",
    functionName: "lavaPosititon",
    args: [params?.id as any],
  });

  const { writeAsync: movePlayer } = useScaffoldContractWrite({
    contractName: "InfernoRoll",
    functionName: "movePlayer",
    args: [params?.id as any],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      console.log(txnReceipt);
    },
  });

  return (
    <div className="flex items-center flex-col flex-grow pt-7">
      <div className="px-5">
        <h1 className="text-center mb-5">
          <span className="block text-2xl mb-2">Match #{params?.id}</span>
        </h1>
        <p>{address}</p>
        <p>Players: {matchData?.numberOfPlayers.toString()}</p>
        <p>Prize Pool: {matchData?.prizePool.toString()} ETH</p>
        <p>Is finish: {matchData?.isFinish ? "Yes" : "No"}</p>
        <p>Lava Positon: {lavaPosititon?.toString()}</p>
        {matchData?.players.map(a => (
          <Player key={a} address={a} matchId={params?.id} />
        ))}
        <button
          className="py-2 px-16 mb-1 mt-3 bg-red-400 rounded baseline hover:bg-red-200 disabled:opacity-50"
          onClick={() => movePlayer()}
        >
          Roll
        </button>
        <button
          className="py-2 px-16 mb-1 mt-3 bg-gray-300 rounded baseline hover:bg-gray-200 disabled:opacity-50"
          onClick={() => router.push("/lobby")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default MatchRoom;
