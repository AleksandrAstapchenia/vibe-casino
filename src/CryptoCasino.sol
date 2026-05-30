// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title CryptoCasino — on-chain coin flip with house edge
/// @notice All funds and game outcomes are verifiable on Sepolia Etherscan.
contract CryptoCasino {
    uint256 public constant MIN_BET = 0.001 ether;
    uint256 public constant MAX_BET = 0.1 ether;
    uint256 public constant PAYOUT_NUMERATOR = 195;
    uint256 public constant PAYOUT_DENOMINATOR = 100;

    address public immutable owner;
    mapping(address => uint256) public balances;

    event Deposited(address indexed player, uint256 amount, uint256 newBalance);
    event Withdrawn(address indexed player, uint256 amount, uint256 newBalance);
    event CoinFlipPlayed(
        address indexed player,
        uint256 betAmount,
        bool choiceHeads,
        bool resultHeads,
        bool won,
        uint256 payout,
        uint256 entropy
    );

    error ZeroAmount();
    error BetOutOfRange();
    error InsufficientBalance();
    error InsufficientHouseLiquidity();
    error TransferFailed();

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        _creditDeposit(msg.sender, msg.value);
    }

    function deposit() external payable {
        _creditDeposit(msg.sender, msg.value);
    }

    function playCoinFlip(bool choiceHeads, uint256 betAmount) external {
        if (betAmount < MIN_BET || betAmount > MAX_BET) revert BetOutOfRange();
        if (balances[msg.sender] < betAmount) revert InsufficientBalance();

        balances[msg.sender] -= betAmount;

        uint256 entropy = uint256(
            keccak256(
                abi.encodePacked(block.prevrandao, block.timestamp, msg.sender, block.number, betAmount)
            )
        );
        bool resultHeads = entropy % 2 == 0;
        bool won = choiceHeads == resultHeads;

        uint256 payout = 0;
        if (won) {
            payout = (betAmount * PAYOUT_NUMERATOR) / PAYOUT_DENOMINATOR;
            if (address(this).balance < payout) revert InsufficientHouseLiquidity();
            balances[msg.sender] += payout;
        }

        emit CoinFlipPlayed(msg.sender, betAmount, choiceHeads, resultHeads, won, payout, entropy);
    }

    function withdraw(uint256 amount) external {
        if (amount == 0) revert ZeroAmount();
        if (balances[msg.sender] < amount) revert InsufficientBalance();

        balances[msg.sender] -= amount;

        (bool ok,) = msg.sender.call{value: amount}("");
        if (!ok) revert TransferFailed();

        emit Withdrawn(msg.sender, amount, balances[msg.sender]);
    }

    function fundHouse() external payable {
        if (msg.value == 0) revert ZeroAmount();
    }

    function houseBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function _creditDeposit(address player, uint256 amount) internal {
        if (amount == 0) revert ZeroAmount();
        balances[player] += amount;
        emit Deposited(player, amount, balances[player]);
    }
}
