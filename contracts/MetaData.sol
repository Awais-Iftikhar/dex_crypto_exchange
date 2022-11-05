// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

abstract contract MetaData {
    function name() external virtual view returns (string memory);


    function symbol() external virtual view returns (string memory);


    function decimals() external virtual returns (uint256){
        return 18;
    }

}
