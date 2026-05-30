// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {CryptoCasino} from "../src/CryptoCasino.sol";

contract CryptoCasinoTest is Test {
    CryptoCasino casino;
    address player = makeAddr("player");

    function setUp() public {
        casino = new CryptoCasino();
        vm.deal(address(casino), 10 ether);
        vm.deal(player, 5 ether);
    }

    function testDeposit() public {
        vm.prank(player);
        casino.deposit{value: 1 ether}();
        assertEq(casino.balances(player), 1 ether);
    }

    function testWithdraw() public {
        vm.startPrank(player);
        casino.deposit{value: 1 ether}();
        casino.withdraw(0.5 ether);
        vm.stopPrank();
        assertEq(casino.balances(player), 0.5 ether);
    }

    function testPlayLoseDeductsBet() public {
        vm.prevrandao(1);
        vm.startPrank(player);
        casino.deposit{value: 1 ether}();
        casino.playCoinFlip(true, 0.01 ether);
        assertEq(casino.balances(player), 0.99 ether);
        vm.stopPrank();
    }

    function testPlayWinPaysOut() public {
        vm.prevrandao(2);
        vm.startPrank(player);
        casino.deposit{value: 1 ether}();
        casino.playCoinFlip(true, 0.01 ether);
        assertEq(casino.balances(player), 1 ether - 0.01 ether + (0.01 ether * 195 / 100));
        vm.stopPrank();
    }

    function testBetOutOfRange() public {
        vm.startPrank(player);
        casino.deposit{value: 1 ether}();
        vm.expectRevert(CryptoCasino.BetOutOfRange.selector);
        casino.playCoinFlip(true, 0.0001 ether);
        vm.stopPrank();
    }
}
