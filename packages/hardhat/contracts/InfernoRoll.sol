//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract InfernoRoll {
  using Counters for Counters.Counter;
  Counters.Counter public numberOfMatches;

  Match[] public matchList;

  struct Match {
    uint256 id;
    uint256 numberOfPlayers;
    uint256 prizePool;
    bool isFinish;
  }

  constructor() {}

  function getMatches() public view returns (Match[] memory){
    return matchList;
  }

  function createMatch() external {
    uint256 newMatchId = numberOfMatches.current();
    matchList.push(Match(newMatchId, 0, 0, false));
    numberOfMatches.increment();
  }

  function joinMatch(uint256 _matchId) external {
    matchList[_matchId].numberOfPlayers += 1;
  }
}