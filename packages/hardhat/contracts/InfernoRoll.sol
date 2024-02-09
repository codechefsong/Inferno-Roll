//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract InfernoRoll {
  using Counters for Counters.Counter;
  Counters.Counter public numberOfMatches;

  Match[] public matchList;

  mapping(address => uint256) public playerPosititon;

  struct Match {
    uint256 id;
    uint256 numberOfPlayers;
    uint256 prizePool;
    address[] players;
    bool isFinish;
  }

  event RollResult(address player, uint256 num);

  constructor() {}

  function getMatches() public view returns (Match[] memory){
    return matchList;
  }

  function getMatchByID(uint256 _matchId) public view returns (Match memory){
    return matchList[_matchId];
  }

  function checkJoinMatch(uint256 _matchId, address _player) public view returns (bool) {
    for (uint i = 0; i < matchList[_matchId].players.length; i++) {
      if (matchList[_matchId].players[i] == _player) {
        return true;
      }
    }

    return false;
  }

  function createMatch() external {
    uint256 newMatchId = numberOfMatches.current();
    matchList.push(Match(newMatchId, 0, 0, new address[](0), false));
    numberOfMatches.increment();
  }

  function joinMatch(uint256 _matchId) external {
    matchList[_matchId].numberOfPlayers += 1;
    matchList[_matchId].players.push(msg.sender);
  }

   function movePlayer() public {
    uint256 randomNumber = uint256(keccak256(abi.encode(block.timestamp, msg.sender))) % 6;
    playerPosititon[msg.sender] += randomNumber + 1;

    emit RollResult(msg.sender, randomNumber);
  }
}