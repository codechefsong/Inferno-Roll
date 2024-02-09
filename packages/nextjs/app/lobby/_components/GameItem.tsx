import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const GameItem = ({ data }: any) => {
  const router = useRouter();
  const { address } = useAccount();

  const { data: isJoined } = useScaffoldContractRead({
    contractName: "InfernoRoll",
    functionName: "checkJoinMatch",
    args: [data.id, address],
  });

  const { writeAsync: joinMatch } = useScaffoldContractWrite({
    contractName: "InfernoRoll",
    functionName: "joinMatch",
    args: [data.id],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      console.log(txnReceipt);
      router.push("/match/" + data.id.toString());
    },
  });

  return (
    <tr key={data.id.toString()} className="text-sm">
      <td className="w-1/12 md:py-4">{data.id.toString()}</td>
      <td className="w-3/12 md:py-4">{data.numberOfPlayers.toString()}</td>
      <td className="w-3/12 md:py-4">{data.prizePool.toString()} ETH</td>
      <td className="w-2/12 md:py-4">
        <p>{data.isMatch ? "Yes" : "No"}</p>
      </td>
      <td className="w-2/12 md:py-4">
        {!isJoined ? (
          <button
            className="py-2 px-16 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
            onClick={() => joinMatch()}
          >
            Join
          </button>
        ) : (
          <button
            className="py-2 px-16 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
            onClick={() => router.push("/match/" + data.id.toString())}
          >
            View
          </button>
        )}
      </td>
    </tr>
  );
};
