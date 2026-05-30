// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {CryptoCasino} from "../src/CryptoCasino.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        uint256 houseSeed = vm.envOr("HOUSE_SEED_ETH", uint256(1 ether));

        vm.startBroadcast(deployerPrivateKey);

        CryptoCasino casino = new CryptoCasino();
        casino.fundHouse{value: houseSeed}();

        console2.log("CryptoCasino deployed at:", address(casino));
        console2.log("House liquidity:", houseSeed);

        vm.stopBroadcast();
    }
}
