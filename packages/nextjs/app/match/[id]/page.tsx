"use client";

import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const MatchRoom: NextPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { address } = useAccount();

  const { data: matchData } = useScaffoldContractRead({
    contractName: "InfernoRoll",
    functionName: "getMatchByID",
    args: [params?.id as any],
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
