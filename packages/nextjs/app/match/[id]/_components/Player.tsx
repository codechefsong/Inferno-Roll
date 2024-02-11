import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const Player = ({ address, matchId }: { address: string; matchId: string }) => {
  const { data: playerPosititon } = useScaffoldContractRead({
    contractName: "InfernoRoll",
    functionName: "getPlayerPosititonByMatchID",
    args: [matchId as any, address],
  });

  return (
    <div className="flex">
      <Address address={address} />
      <p className="ml-3">{playerPosititon?.toString()} </p>
    </div>
  );
};
