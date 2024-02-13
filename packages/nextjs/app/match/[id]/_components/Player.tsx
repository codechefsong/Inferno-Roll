import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const Player = ({
  address,
  matchId,
  lavaPosititon,
}: {
  address: string;
  matchId: string;
  lavaPosititon: any;
}) => {
  const { data: playerPosititon } = useScaffoldContractRead({
    contractName: "InfernoRoll",
    functionName: "getPlayerPosititonByMatchID",
    args: [matchId as any, address],
  });

  return (
    <div className="flex" style={{ marginLeft: (Number(playerPosititon?.toString()) - Number(lavaPosititon)) * 2 }}>
      <Address address={address} />
      <p className="ml-3">{playerPosititon?.toString()} </p>
    </div>
  );
};
